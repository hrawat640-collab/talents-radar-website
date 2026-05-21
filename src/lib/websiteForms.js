/** Posts to Supabase REST — anon key + RLS insert-only policies */

const DEFAULT_URL = 'https://oqknepaevzhcmmmatame.supabase.co';
const DEFAULT_ANON_KEY = 'sb_publishable_ZwdxLA2twuvjkBug6JPxxA_zlWzaVN2';

export function leadMetadata() {
  try {
    return {
      path: typeof window !== 'undefined' ? window.location.pathname || '/' : '/',
      referrer: typeof document !== 'undefined' ? document.referrer || null : null,
    };
  } catch {
    return {};
  }
}

/** UTM + page attribution for early access signups */
export function getMarketingAttribution(sourcePage = '/') {
  try {
    const params = new URLSearchParams(
      typeof window !== 'undefined' ? window.location.search : '',
    );
    return {
      source_page:
        typeof window !== 'undefined' ? window.location.pathname || sourcePage : sourcePage,
      utm_source: params.get('utm_source') || null,
      utm_campaign: params.get('utm_campaign') || null,
      utm_medium: params.get('utm_medium') || null,
    };
  } catch {
    return {
      source_page: sourcePage,
      utm_source: null,
      utm_campaign: null,
      utm_medium: null,
    };
  }
}

export function getSupabaseConfig() {
  const envUrl = import.meta.env.VITE_SUPABASE_URL;
  const url = (typeof envUrl === 'string' && envUrl.trim() ? envUrl : DEFAULT_URL).trim();

  const envKeyRaw = import.meta.env.VITE_SUPABASE_ANON_KEY;
  const envKey = typeof envKeyRaw === 'string' && envKeyRaw.trim() ? envKeyRaw.trim() : '';
  const winKey =
    typeof window !== 'undefined' && window.SUPABASE_ANON_KEY
      ? String(window.SUPABASE_ANON_KEY).trim()
      : '';
  const key = envKey || winKey || DEFAULT_ANON_KEY;

  return { url, key };
}

async function postRow(table, row) {
  const { url, key } = getSupabaseConfig();
  return fetch(`${url}/rest/v1/${table}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: key,
      Authorization: `Bearer ${key}`,
      Prefer: 'return=minimal',
    },
    body: JSON.stringify(row),
  });
}

async function readSupabaseError(res) {
  try {
    const text = await res.text();
    if (!text) return '';
    try {
      const json = JSON.parse(text);
      return json?.message || json?.hint || text;
    } catch {
      return text;
    }
  } catch {
    return '';
  }
}

function stripLegacyUnsafeColumns(row) {
  const { phone, message, source, ...safe } = row;
  void phone;
  void message;
  void source;
  return safe;
}

/**
 * Early access — public.beta_signups
 * @param {{ first_name: string, last_name?: string|null, company?: string|null, email: string, product_interest: 'Radar AI'|'RetainIQ', source_page?: string }} row
 */
export async function insertBetaSignup(row) {
  const { key } = getSupabaseConfig();
  if (!key) {
    console.warn('[Talents Radar] Supabase anon key is missing.');
    return { ok: false, status: 0, error: 'Supabase key missing' };
  }

  const attribution = getMarketingAttribution(row.source_page);
  const payload = {
    first_name: row.first_name,
    last_name: row.last_name?.trim() || null,
    company: row.company?.trim() || null,
    email: row.email,
    product_interest: row.product_interest,
    source_page: attribution.source_page,
    utm_source: attribution.utm_source,
    utm_campaign: attribution.utm_campaign,
    utm_medium: attribution.utm_medium,
  };

  let res = await postRow('beta_signups', payload);
  if (res.ok) return { ok: true, status: res.status };

  let error = await readSupabaseError(res);

  // Fallback: mirror into website_form_submissions if beta_signups table not deployed yet
  if (res.status === 404 || /relation.*does not exist|schema cache/i.test(error)) {
    const mirror = await insertWebsiteFormSubmission({
      form_type: 'early_access',
      first_name: row.first_name,
      last_name: row.last_name?.trim() || null,
      email: row.email,
      company: row.company?.trim() || null,
      source: `early_access_${row.product_interest.replace(/\s+/g, '_').toLowerCase()}`,
      metadata: {
        ...leadMetadata(),
        product_interest: row.product_interest,
        ...attribution,
      },
    });
    return mirror;
  }

  return { ok: false, status: res.status, error };
}

/**
 * @param {Record<string, unknown>} row
 */
export async function insertWebsiteFormSubmission(row) {
  const { key } = getSupabaseConfig();
  if (!key) {
    console.warn('[Talents Radar] Supabase anon key is missing.');
    return { ok: false, status: 0, error: 'Supabase key missing' };
  }

  let res = await postRow('website_form_submissions', row);
  if (res.ok) return { ok: true, status: res.status };

  let error = await readSupabaseError(res);

  if (res.status === 400 && /column .* does not exist|schema cache/i.test(error)) {
    const fallbackRow = stripLegacyUnsafeColumns(row);
    res = await postRow('website_form_submissions', fallbackRow);
    if (res.ok) return { ok: true, status: res.status };
    error = await readSupabaseError(res);
  }

  return { ok: false, status: res.status, error };
}

export function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || '').trim());
}
