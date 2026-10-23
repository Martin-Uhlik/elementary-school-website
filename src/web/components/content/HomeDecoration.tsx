type Props = { shape: "squares" | "bars" | "zigzag" };

// The light background shapes from the original landing page, drawn in the empty side of each row
const HomeDecoration = ({ shape }: Props) => (
  <svg className={`home-deco home-deco--${shape}`} viewBox="0 0 300 80" aria-hidden="true" focusable="false">
    {shape === "squares" &&
      [0, 1, 2, 3, 4].map((i) => (
        <rect key={i} x={12 + i * 56} y={22} width={36} height={36} transform={`rotate(45 ${30 + i * 56} 40)`} />
      ))}
    {shape === "bars" && (
      <>
        <rect x="0" y="32" width="120" height="16" rx="3" />
        <rect x="140" y="32" width="48" height="16" rx="3" />
        <rect x="208" y="32" width="24" height="16" rx="3" />
      </>
    )}
    {shape === "zigzag" && <polyline points="4,10 52,70 100,10 148,70 196,10 244,70 292,10" />}
  </svg>
);

export default HomeDecoration;
