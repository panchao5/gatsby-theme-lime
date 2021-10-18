import { useEffect, useRef, RefObject } from "react";

const defaultEvents = ["mousedown", "touchstart"];

export const useClickAway = (
  ref: RefObject<HTMLElement>,
  onClickAway: (e: Event) => void,
  events = defaultEvents
) => {
  const savedCallback = useRef(onClickAway);

  useEffect(() => {
    savedCallback.current = onClickAway;
  }, [onClickAway]);

  useEffect(() => {
    const handler = (event: Event) => {
      const { current: el } = ref;

      if (el && !el.contains(event.target as Node)) {
        savedCallback.current(event);
      }
    };

    events.forEach((eventName) => {
      document.addEventListener(eventName, handler);
    });

    return () => {
      events.forEach((eventName) => {
        document.removeEventListener(eventName, handler);
      });
    };
  });
};

export default useClickAway;
