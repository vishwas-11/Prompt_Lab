type Props = {
  prompts: string[];
  setPrompts: (p: string[]) => void;
};

export default function PromptListInput({ prompts, setPrompts }: Props) {
  const updatePrompt = (index: number, value: string) => {
    const updated = [...prompts];
    updated[index] = value;
    setPrompts(updated);
  };

  const addPrompt = () => {
    setPrompts([...prompts, ""]);
  };

  const removePrompt = (index: number) => {
    setPrompts(prompts.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-2">
      <h2 className="font-semibold">Prompts</h2>

      {prompts.map((p, i) => (
        <div key={i} className="flex gap-2">
          <input
            value={p}
            onChange={(e) => updatePrompt(i, e.target.value)}
            placeholder={`Prompt ${i + 1}`}
            className="flex-1 p-2 bg-gray-800 border border-gray-600 rounded"
          />

          <button
            onClick={() => removePrompt(i)}
            className="bg-red-600 px-2 rounded"
          >
            ✕
          </button>
        </div>
      ))}

      <button
        onClick={addPrompt}
        className="bg-green-600 px-3 py-1 rounded"
      >
        + Add Prompt
      </button>
    </div>
  );
}