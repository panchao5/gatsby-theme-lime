/**
 * borrowed from react-use
 */
import { useEffect, useState } from "react";

const isBrowser = typeof window !== "undefined";

export const useMedia = (query: string, defaultState?: boolean) => {
  const [state, setState] = useState(
    isBrowser ? () => window.matchMedia(query).matches : defaultState
  );

  useEffect(() => {
    let mounted = true;
    const mql = window.matchMedia(query);
    const onChange = () => {
      if (!mounted) {
        return;
      }
      setState(!!mql.matches);
    };

    mql.addEventListener("change", onChange);
    setState(mql.matches);

    return () => {
      mounted = false;
      mql.removeEventListener("change", onChange);
    };
  }, [query]);

  return state;
};

export default useMedia;
