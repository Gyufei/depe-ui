export default function PanelLeaderButton({
  isActive,
  children,
}: {
  isActive: boolean;
  children: React.ReactNode;
}) {
  const activeState = isActive ? "active" : "inactive";
  return (
    <div
      data-state={activeState}
      className="c-active-border relative ml-6 h-11 w-[153px] rounded-t-xl border-2 border-b-0 p-2"
    >
      <div
        data-state={activeState}
        className="c-active-border h-9 rounded-t-md border-2 border-b-0"
      >
        <button
          data-state={activeState}
          className="c-shadow-btn c-active-border c-active-shadow absolute -top-10 rounded-[32px] bg-pink text-xl "
        >
          {children}
        </button>
      </div>
    </div>
  );
}
