"use client";

type Props = {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
};

export default function PromptBox({ value, onChange, placeholder }: Props) {
  return (
    <textarea
      rows={5}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px" }}
      className="w-full bg-white/3 border border-white/[0.07] rounded-xl px-5 py-4 text-white/80 placeholder-white/15 focus:outline-none focus:border-white/20 focus:bg-white/5 transition-all resize-none leading-relaxed"
    />
  );
}