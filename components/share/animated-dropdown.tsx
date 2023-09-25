import { animated, useSpring } from "react-spring";
import useResizeObserver from "use-resize-observer";

export default function AnimatedDropdown({
  open,
  children,
}: React.PropsWithChildren<{ open: boolean }>) {
  const { ref, height } = useResizeObserver();

  const props = useSpring({
    height: open ? height ?? "auto" : 0,
    config: {
      mass: 1.2,
      tension: 300,
      friction: 20,
      clamp: true,
      velocity: 0.01,
    },
  });
  return (
    <animated.div
      style={{
        ...props,
        overflow: "hidden",
        width: "100%",
        minWidth: "min-content",
        willChange: "height",
      }}
    >
      <div ref={ref}>{children}</div>
    </animated.div>
  );
}
