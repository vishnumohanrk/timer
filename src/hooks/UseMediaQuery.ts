import { useEffect, useState } from 'react';

export function useMediaQuery(mediaQuery: string) {
  const [matches, setMatches] = useState(
    () => window.matchMedia(mediaQuery).matches
  );

  useEffect(() => {
    const mediaQueryList = window.matchMedia(mediaQuery);

    function handleChange(e: MediaQueryListEvent) {
      setMatches(e.matches);
    }

    mediaQueryList.addEventListener('change', handleChange);

    return () => {
      mediaQueryList.removeEventListener('change', handleChange);
    };
  }, [mediaQuery]);

  return matches;
}
