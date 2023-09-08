import { useState, useEffect, RefObject } from 'react';

/**
 * Custom hook to track the scroll position relative to a container element.
 * @param {React.RefObject<HTMLElement>} scrollContainerRef - Reference to the container element.
 * @param {object} observerOptions - Options for the IntersectionObserver.
 * @param {number} observerOptions.margins.top - Top margin in pixels for activating the intersection.
 * @param {number} observerOptions.margins.right - Right margin in pixels for activating the intersection.
 * @param {number} observerOptions.margins.bottom - Bottom margin in pixels for activating the intersection.
 * @param {number} observerOptions.margins.left - Left margin in pixels for activating the intersection.
 * @param {number} observerOptions.threshold - The threshold at which to trigger the intersection callback.
 * @param {function} callback - Callback function to be called when the container intersects with the viewport.
 * @returns {number} - The scroll position as a percentage (0 to 100) relative to the container element and margins.
 */

interface UseContainerScrollPositionArgs {
  scrollContainerRef: RefObject<HTMLDivElement>;
  observerOptions: {
    root: object | null;
    margins: {
      top: number;
      right: number;
      bottom: number;
      left: number;
    };
    threshold: number;
  };
  callback: (entry: boolean) => void;
}

export default function useContainerScrollPosition({
  scrollContainerRef,
  observerOptions = {
    root: null,
    margins: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
    threshold: 0,
  },
  callback,
}: UseContainerScrollPositionArgs) {
  const [containerScrollPosition, setContainerScrollPosition] = useState(0);

  useEffect(() => {
    /**
     * Event handler for scroll events.
     */
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        const containerElement = scrollContainerRef.current;
        const { top, height } = containerElement.getBoundingClientRect();
        const containerTopOffset = top + window.scrollY - observerOptions.margins.top;
        const containerBottomOffset =
          top + window.scrollY + height + observerOptions.margins.bottom;
        const scrollPosition = window.scrollY;

        if (scrollPosition < containerTopOffset) {
          setContainerScrollPosition(0);
        } else if (scrollPosition > containerBottomOffset) {
          setContainerScrollPosition(100);
        } else {
          const scrollableHeight =
            height + observerOptions.margins.top + observerOptions.margins.bottom;
          const scrollablePercentage =
            (scrollPosition - containerTopOffset) / scrollableHeight;
          const scrollPercentage = scrollablePercentage * 100;
          setContainerScrollPosition(scrollPercentage);
        }
      }
    };

    interface IntersectionObserverOptions {
      root: object | null;
      rootMargin: string;
      threshold: number;
    }

    const options: IntersectionObserverOptions = {
      root: observerOptions?.root,
      rootMargin: `${observerOptions.margins.top}px ${observerOptions.margins.right}px ${observerOptions.margins.bottom}px ${observerOptions.margins.left}px`,
      threshold: observerOptions.threshold,
    };

    const observer = new IntersectionObserver(([entry]) => {
      callback(entry.isIntersecting);
      if (entry.isIntersecting) {
        window.addEventListener('scroll', handleScroll);
      } else {
        window.removeEventListener('scroll', handleScroll);
      }
    }, options as IntersectionObserverInit);

    if (scrollContainerRef.current) {
      observer.observe(scrollContainerRef.current);
    }

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollContainerRef]);

  return containerScrollPosition;
}
