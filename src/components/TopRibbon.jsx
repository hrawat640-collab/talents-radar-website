export default function TopRibbon() {
  const scrollToRadarEarlyAccess = () => {
    document.getElementById('radar-ai-early-access')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="relative border-b border-purple-100/80 bg-purple-50/50">
      <button
        type="button"
        onClick={scrollToRadarEarlyAccess}
        className="mx-auto flex w-full max-w-6xl items-center justify-center gap-2 px-5 py-2 text-center text-xs font-medium text-purple-800/90 transition-colors duration-300 hover:bg-purple-50/80 hover:text-purple-900"
      >
        <span>Radar AI Early Access now open</span>
        <span className="text-purple-600/70" aria-hidden>
          →
        </span>
      </button>
    </div>
  );
}
