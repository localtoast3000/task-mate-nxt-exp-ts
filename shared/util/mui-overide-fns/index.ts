import overide from './overide';
export { overide };

interface OveridesObject {
  selector: string;
  options: {
    style: { [key: string]: string } | null;
    className: string;
  };
}

export function overides(
  mainElement: HTMLElement | null,
  overidesObject: OveridesObject
) {
  if (!mainElement) return;
  Object.entries(overidesObject).forEach(([selector, options]) => {
    overide(mainElement, { selector, ...options });
  });
}
