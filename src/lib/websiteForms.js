/** Posts to Supabase REST — anon key + RLS insert-only policy on website_form_submissions */
const DEFAULT_URL = 'https://tqymwtcdsqoqpvbggpnk.supabase.co';

/** Matches legacy fallback; override with VITE_SUPABASE_ANON_KEY in production if you rotate keys */
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

/**
 * @param {Record<string, unknown>} row — matches public.website_form_submissions insert shape
 * @returns {Promise<{ ok: boolean; status: number }>}
 */
export async function insertWebsiteFormSubmission(row) {
  const { url, key } = getSupabaseConfig();
  if (!key) {
    console.warn('[Talents Radar] Supabase anon key is missing.');
    return { ok: false, status: 0 };
  }
  const res = await fetch(`${url}/rest/v1/website_form_submissions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: key,
      Authorization: `Bearer ${key}`,
      Prefer: 'return=minimal',
    },
    body: JSON.stringify(row),
  });
  return { ok: res.ok, status: res.status };
}

export function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || '').trim());
}
