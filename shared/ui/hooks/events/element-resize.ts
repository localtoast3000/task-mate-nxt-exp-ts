import { useEffect, useState, useCallback } from 'react';

/**
 * A React hook that calls a callback function whenever the size of an element or
 * the window changes.
 *
 * @param {Element|null} element The element to attach the resize event listener to,
 * or null to attach it to the window object.
 * @param {function({ width: number, height: number }): void} cb The callback function
 * to call whenever the size of the element or window changes.
 *
 */

interface ElementSize {
  element: string;
  width: number | string;
  height: number | string;
}

export default function useElementResizeEvent(
  cb: (elementSize: ElementSize) => void,
  element: HTMLElement | null = null
) {
  const [elementSize, setElementSize] = useState(() => {
    return {
      element: (element && element) || 'window',
      width:
        (element && element.offsetWidth) ||
        (typeof window !== 'undefined' && window.innerWidth) ||
        0,
      height:
        (element && element.offsetHeight) ||
        (typeof window !== 'undefined' && window.innerHeight) ||
        0,
    } as ElementSize;
  });

  const handleResize = useCallback(() => {
    setElementSize({
      element: (element && element) || 'window',
      width:
        (element && element.offsetWidth) ||
        (typeof window !== 'undefined' && window.innerWidth) ||
        0,
      height:
        (element && element.offsetHeight) ||
        (typeof window !== 'undefined' && window.innerHeight) ||
        0,
    } as ElementSize);
  }, [element]);

  useEffect(() => {
    if (element) {
      element.addEventListener('resize', handleResize);
      return () => element.removeEventListener('resize', handleResize);
    } else if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, [element, handleResize]);

  useEffect(() => {
    cb(elementSize);
  }, [elementSize, cb]);
}
