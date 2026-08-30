import type { Ingredient, Step } from "@/lib/types";

function renderInstruction(instruction: string, nameById: Record<string, string>): string {
  return instruction.replace(/\{([a-z0-9-]+)\}/g, (match, key) => nameById[key] ?? match);
}

function formatTimer(seconds: number): string {
  if (seconds >= 60) {
    const minutes = Math.round(seconds / 60);
    return `${minutes} min`;
  }
  return `${seconds}s`;
}

export default function StepList({ steps, ingredients }: { steps: Step[]; ingredients: Ingredient[] }) {
  const nameById = Object.fromEntries(ingredients.map((i) => [i.id, i.name]));

  return (
    <ol className="steps">
      {steps.map((step) => (
        <li key={step.order} className="step-item">
          <span className="step-number">Step {step.order}</span>
          <div className="step-body">
            <p>{renderInstruction(step.instruction, nameById)}</p>
            {typeof step.timerSeconds === "number" && <p className="step-timer">Timer: {formatTimer(step.timerSeconds)}</p>}
          </div>
        </li>
      ))}
    </ol>
  );
}