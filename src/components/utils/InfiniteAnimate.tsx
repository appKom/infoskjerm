import { useState, useRef, useEffect, useCallback } from "react";

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
  const [components, setComponents] = useState<ComponentItem[]>([]);
  const [divSize, setDivSize] = useState(0);
  const [componentOffset, setComponentOffset] = useState(0);

  const childrenArray = useRef<React.ReactNode[][]>([]);
  const intervalRef = useRef<number | undefined>(undefined);
  const divRef = useRef<HTMLDivElement | null>(null);
  const resizeObserver = useRef(new ResizeObserver(entries => {
    for (const entry of entries) {
      setDivSize(props.axis === 'x' ? entry.contentRect.width : props.axis === 'y' ? entry.contentRect.height : 0);
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
    setComponentOffset((offset) => offset < -divSize / props.trainLength ? 0 : offset - props.speed);
  }, [divSize, props.speed, props.trainLength]);

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
    for (let i = 0; i < props.trainLength; i++) {
      childrenArray.current.push(props.children);
    }
    setComponents(childrenArray.current.map((e, i) => ({ id: i, element: e })));
  }, [props.children, props.trainLength]);

  if (props.children?.length < 3) return (
    <div className="flex flex-col gap-8 overflow-hidden w-max">
      {props.children?.map((child) => (
        child
      )) || []}
    </div>
  );

  return (
    <div
      ref={divRef}
      className={`relative flex ${props.axis === 'y' ? 'flex-col' : ''} gap-8 overflow-hidden w-max`}
      style={props.axis === 'x' ? { left: `${componentOffset}px` } : { top: `${componentOffset}px` }}
    >
      {components.map((component, index) => (
        <div
          key={index}
          className={`flex ${props.axis === 'y' ? 'flex-col' : ''} gap-8`}
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