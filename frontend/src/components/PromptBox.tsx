"use client";

type Props = {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
};

export default function PromptBox({ value, onChange, placeholder }: Props) {
  return (
    <textarea
      className="w-full p-3 border rounded-lg"
      rows={4}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}