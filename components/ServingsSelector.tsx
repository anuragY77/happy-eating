"use client";

const PRESETS = [1, 2, 4];

interface ServingsSelectorProps {
  value: number;
  onChange: (servings: number) => void;
}

export default function ServingsSelector({ value, onChange }: ServingsSelectorProps) {
  return (
    <div data-current-servings={value}>
      <span>Servings:</span>
      {PRESETS.map((n) => (
        <button key={n} type="button" onClick={() => onChange(n)} aria-pressed={value === n}>
          {n}
        </button>
      ))}
      <label>
        Custom
        <input
          type="number"
          min={1}
          value={value}
          onChange={(e) => {
            const next = Number(e.target.value);
            if (Number.isInteger(next) && next >= 1) {
              onChange(next);
            }
          }}
        />
      </label>
    </div>
  );
}