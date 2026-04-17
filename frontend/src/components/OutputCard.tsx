export default function OutputCard({ title, content, accent }: { title: string; content: string; accent?: string }) {
  return (
    <div className="bg-white/3 border border-white/6 rounded-xl overflow-hidden flex flex-col h-full">
      <div className="flex items-center justify-between px-5 py-3 border-b border-white/6">
        <div className="flex items-center gap-2.5">
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: accent || "rgba(255,255,255,0.2)" }} />
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px" }} className="text-white/40 tracking-[0.2em] uppercase">
            {title}
          </span>
        </div>
        {content && (
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px" }} className="text-white/20">
            {content.length} chars
          </span>
        )}
      </div>
      <div className="flex-1 p-5 min-h-45">
        {content ? (
          <p className="text-white/70 text-sm leading-relaxed font-light whitespace-pre-wrap">
            {content}
          </p>
        ) : (
          <div className="h-full flex items-center justify-center">
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px" }} className="text-white/15 tracking-widest uppercase">
              Awaiting output...
            </span>
          </div>
        )}
      </div>
    </div>
  );
}