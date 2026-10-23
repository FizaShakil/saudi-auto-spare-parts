"use client";

/**
 * Labelled native `<select>` used by the vehicle selector.
 *
 * Native select is used on purpose: it gives correct keyboard behaviour,
 * mobile pickers and screen-reader support for free, while the wrapper
 * controls the visual treatment and the disabled/error states.
 */

import { ChevronDown } from "lucide-react";

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  /** Rendered as the unselected placeholder option. */
  placeholder: string;
  disabled?: boolean;
  /** Optional secondary line shown under the label. */
  hint?: string;
  /** Validation message. Present ⇒ `aria-invalid` and `role="alert"`. */
  error?: string;
}

export function SelectField({
  id,
  label,
  value,
  onChange,
  options,
  placeholder,
  disabled = false,
  hint,
  error,
}: SelectFieldProps) {
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-baseline justify-between gap-3">
        <label
          htmlFor={id}
          className="text-sm font-medium text-ink"
        >
          {label}
        </label>
        {hint && (
          <span id={hintId} className="text-xs text-muted">
            {hint}
          </span>
        )}
      </div>

      <div className="relative">
        <select
          id={id}
          name={id}
          value={value}
          disabled={disabled}
          onChange={(event) => onChange(event.target.value)}
          aria-invalid={error ? true : undefined}
          aria-describedby={[error ? errorId : null, hint ? hintId : null]
            .filter(Boolean)
            .join(" ")}
          className={`h-12 w-full appearance-none rounded-control border bg-white px-3.5 pr-10 text-base text-ink transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${
            error
              ? "border-danger"
              : disabled
                ? "border-line bg-surface text-muted/70"
                : "border-line hover:border-muted/60"
          } ${disabled ? "cursor-not-allowed" : "cursor-pointer"}`}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <ChevronDown
          aria-hidden="true"
          className={`pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 ${
            disabled ? "text-muted/50" : "text-muted"
          }`}
        />
      </div>

      {error && (
        <p id={errorId} role="alert" className="text-sm font-medium text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
