import { useState, useRef, useEffect, useCallback } from "react";
import clsx from "clsx";

type ComponentItem = {
  id: number;
  element: React.ReactNode[];
};

type InfiniteAnimateProps = {
  axis: 'x' | 'y';
  speed: number;
  children: React.ReactNode[];
  trainLength: number;
}

export const InfiniteAnimate = (props: InfiniteAnimateProps) => {
  const { axis, speed, children, trainLength } = props;

  const [components, setComponents] = useState<ComponentItem[]>([]);
  const [divSize, setDivSize] = useState(0);
  const [componentOffset, setComponentOffset] = useState(0);

  const childrenArray = useRef<React.ReactNode[][]>([]);
  const intervalRef = useRef<number | undefined>(undefined);
  const divRef = useRef<HTMLDivElement | null>(null);
  const resizeObserver = useRef(new ResizeObserver(entries => {
    for (const entry of entries) {
      setDivSize(axis === 'x' ? entry.contentRect.width : axis === 'y' ? entry.contentRect.height : 0);
    }
  }));

  useEffect(() => {
    if (divRef.current) {
      resizeObserver.current.observe(divRef.current);
    }
    return () => {
      if (divRef.current) {
        resizeObserver.current.unobserve(divRef.current);
      }
    };
  }, []);

  const handleInterval = useCallback(() => {
    setComponentOffset((offset) => offset < -divSize / trainLength ? 0 : offset - speed);
  }, [divSize, speed, trainLength]);

  useEffect(() => {
    if (divSize > 0) {
      intervalRef.current = setInterval(handleInterval, 10);
      return () => {
        clearInterval(intervalRef.current!);
      };
    }
  }, [divSize, handleInterval]);

  useEffect(() => {
    childrenArray.current = [];
    for (let i = 0; i < trainLength; i++) {
      childrenArray.current.push(children);
    }
    setComponents(childrenArray.current.map((e, i) => ({ id: i, element: e })));
  }, [children, trainLength]);

  if (children?.length === 1) return (
    <div className="flex flex-col gap-8 overflow-hidden w-max">
      {children?.map((child) => (
        child
      )) || []}
    </div>
  );

  return (
    <div
      ref={divRef}
      className={clsx(
        "relative flex gap-8 overflow-hidden w-max",
        axis === 'y' && 'flex-col'
      )}
      style={axis === 'x' ? { left: `${componentOffset}px` } : { top: `${componentOffset}px` }}
    >
      {components.map((component, index) => (
        <div
          key={index}
          className={clsx(
            "flex gap-8",
            axis === 'y' && 'flex-col'
          )}
        >
          {component.element.map((item, itemIndex) => (
            <div key={itemIndex}>
              {item}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
