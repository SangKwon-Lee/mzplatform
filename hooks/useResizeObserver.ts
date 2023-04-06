import { useEffect, useRef } from "react";
import ResizeObserver from "resize-observer-polyfill";

const useResizeObserver = ({ callback, element }: any) => {
  const current = element && element.current;
  const observer = useRef(null);

  useEffect(() => {
    if (observer && observer.current && current) {
      //@ts-ignore
      observer.current.unobserve(current);
    }
    const observe = () => {
      if (element && element.current && observer.current) {
        //@ts-ignore
        observer.current.observe(element.current);
      }
    };
    const resizeObserverOrPolyfill = ResizeObserver;
    //@ts-ignore
    observer.current = new resizeObserverOrPolyfill(callback);
    observe();

    return () => {
      if (observer && observer.current && element && element.current) {
        //@ts-ignore
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.current.unobserve(element.current);
      }
    };
  }, [callback, current, element]);
};

export default useResizeObserver;
