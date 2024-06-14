import { useState, useRef, useEffect, useCallback } from "react";

type InfiniteAnimateProps = {
  axis: 'x' | 'y';
  speed: number;
  children: React.ReactNode[];
  trainLength: number;
  divSize?: number;
}

export const InfiniteAnimate = (props: InfiniteAnimateProps) => {
  const [components, setComponents] = useState([]);
  const [divSize, setDivSize] = useState(0);
  const [componentOffset, setComponentOffset] = useState(0);

  const childrenArray = useRef<React.ReactNode[][]>([]);
  const intervalRef = useRef<number | undefined>(undefined);
  const divRef = useRef(null);
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
  }, [divRef.current]);

  const handleInterval = useCallback(() => {
    setComponentOffset((offset) => offset < -divSize / props.trainLength ? 0 : offset - props.speed);
  }, [divSize]);

  useEffect(() => {
    if (divSize > 0) {
      intervalRef.current = setInterval(handleInterval, 10);
      return () => {
        if (typeof intervalRef.current !== 'undefined') {
          clearInterval(intervalRef.current);
        }
      };
    }
  }, [divSize, handleInterval]);

  useEffect(() => {
    childrenArray.current = [];
    for (let i = 0; i < props.trainLength; i++) {
      childrenArray.current.push(props.children);
    }
    setComponents(childrenArray.current.map((e, i) => ({ id: i, element: e })));
  }, []);

  return (
    <div
      ref={divRef}
      className={`relative flex ${props.axis === 'y' && 'flex-col'} gap-8 overflow-hidden w-max`}
      style={props.axis === 'x' ? { left: `${componentOffset}px` } : { top: `${componentOffset}px` }}
    >
      {components.map((component, index) => (
        <div
          key={index}
          className={`flex ${props.axis === 'y' ? 'flex-col' : ''} gap-8`}
        >
          {component.element.map((meme, memeIndex) => (
            <div key={memeIndex}>
              {meme}
            </div>
          ))}
        </div>
      ))}
    </div>

  )
}