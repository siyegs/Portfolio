import type { Tone } from "../../lib/work";
import { MetaLabel } from "./primitives";

export interface Spec {
  label: string;
  value: string;
}

/**
 * The project spec sheet: a hairline-ruled key/value list.
 *
 * Everything here is derived from the project record rather than written per
 * project, so a new entry cannot ship with a half-filled sheet.
 */
export default function SpecRegister({
  specs,
  tone: t,
  className = "",
}: {
  specs: Spec[];
  tone: Tone;
  className?: string;
}) {
  return (
    <dl className={className}>
      {specs.map((spec) => (
        <div
          key={spec.label}
          className={`grid grid-cols-[6.5rem_1fr] gap-4 border-t py-3.5 md:grid-cols-[7.5rem_1fr] ${t.rule}`}
        >
          <dt className="pt-[3px]">
            <MetaLabel className={t.faint}>{spec.label}</MetaLabel>
          </dt>
          <dd className={`text-[15px] leading-relaxed ${t.body}`}>{spec.value}</dd>
        </div>
      ))}
    </dl>
  );
}
