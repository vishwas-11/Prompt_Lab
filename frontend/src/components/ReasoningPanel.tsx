export default function ReasoningPanel({ steps }: { steps: string[] }) {
  return (
    <div className="bg-white/3 border border-white/6 rounded-xl overflow-hidden flex flex-col h-full">
      <div className="flex items-center gap-2.5 px-5 py-3 border-b border-white/6">
        <div className="w-1.5 h-1.5 rounded-full bg-purple-400/60" />
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px" }} className="text-white/40 tracking-[0.2em] uppercase">
          CoT Thought Process
        </span>
      </div>
      <div className="flex-1 p-5 min-h-45">
        {steps.length > 0 ? (
          <div className="space-y-3">
            {steps.map((step, i) => (
              <div key={i} className="flex gap-3">
                <div className="shrink-0 mt-0.5">
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px" }} className="text-white/20">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="flex-1 border-l border-white/6 pl-3">
                  <p className="text-white/60 text-sm leading-relaxed font-light">{step}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="h-full flex items-center justify-center">
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px" }} className="text-white/15 tracking-widest uppercase">
              No steps yet...
            </span>
          </div>
        )}
      </div>
    </div>
  );
}