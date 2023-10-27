export function ProfitText({
  isGtZero,
  children,
}: {
  isGtZero: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      data-state={isGtZero ? "positive" : "negative"}
      className="data-[state=positive]:text-green data-[state=negative]:text-red"
    >
      {children}
    </div>
  );
}
