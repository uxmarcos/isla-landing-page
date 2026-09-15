type SlideLabelProps = {
  primary: string;
  secondary?: string;
  className?: string;
};

/**
 * Vertical sliding text used inside CTA buttons.
 * Place this inside a parent that has the `group` class — on hover the
 * primary label slides up and the secondary label slides in from below.
 *
 * Both labels share identical typography (inherited from parent) so the
 * motion stays tight and crisp.
 */
export function SlideLabel({
  primary,
  secondary,
  className = "",
}: SlideLabelProps) {
  const second = secondary ?? primary;
  return (
    <span
      className={`relative inline-block h-[1.2em] overflow-hidden leading-[1.2em] ${className}`}
    >
      <span
        className="block transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:-translate-y-full"
      >
        {primary}
      </span>
      <span
        aria-hidden="true"
        className="absolute inset-0 block translate-y-full transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:translate-y-0"
      >
        {second}
      </span>
    </span>
  );
}

export default SlideLabel;
