import StepCard from "./StepCard";

export default function ReactTimeline({ steps }: { steps: any[] }) {
  return (
    <div className="bg-gray-900 p-4 rounded-lg">
      <h2 className="text-lg font-semibold mb-3">⚡ ReAct Timeline</h2>

      <div className="space-y-3">
        {steps.map((step, i) => (
          <StepCard key={i} {...step} />
        ))}
      </div>
    </div>
  );
}