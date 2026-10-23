/**
 * VIN validation for the demo lookup.
 *
 * DEMO LIMITATION: this only validates the *shape* of a VIN. No check digit
 * is calculated and no vehicle database is queried — the resolved vehicle
 * comes from `demoVinMapping` in `src/data/mock.ts`.
 */

export const VIN_LENGTH = 17;

/** ISO 3779 excludes I, O and Q to avoid confusion with 1, 0 and Q/D. */
export const FORBIDDEN_VIN_CHARS = ["I", "O", "Q"] as const;

export type VinValidation =
  | { ok: true; vin: string }
  | { ok: false; message: string };

/** Uppercases and strips spaces and hyphens typed by the customer. */
export function normalizeVin(raw: string): string {
  return raw.replace(/[\s-]/g, "").toUpperCase();
}

/**
 * Validates a VIN and returns an actionable error message when invalid.
 * Problems are reported one at a time, most specific first.
 */
export function validateVin(raw: string): VinValidation {
  const vin = normalizeVin(raw);

  if (vin.length === 0) {
    return { ok: false, message: "Enter your 17-character VIN to continue." };
  }

  const forbidden = FORBIDDEN_VIN_CHARS.filter((char) => vin.includes(char));
  if (forbidden.length > 0) {
    return {
      ok: false,
      message: `A VIN cannot contain ${forbidden
        .map((char) => `“${char}”`)
        .join(", ")}. Remove ${forbidden.length > 1 ? "those letters" : "that letter"} and try again.`,
    };
  }

  if (vin.length !== VIN_LENGTH) {
    const difference = VIN_LENGTH - vin.length;
    const hint =
      difference > 0
        ? `${Math.abs(difference)} more character${Math.abs(difference) === 1 ? "" : "s"} needed.`
        : `${Math.abs(difference)} too many characters.`;
    return {
      ok: false,
      message: `A VIN has exactly ${VIN_LENGTH} characters — ${hint}`,
    };
  }

  return { ok: true, vin };
}
