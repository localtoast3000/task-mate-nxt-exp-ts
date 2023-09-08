import overide from './overide';
export { overide };
export function overides(mainElement, overidesObject) {
  if (!mainElement) return;
  Object.entries(overidesObject).forEach(([selector, options]) => {
    overide(mainElement, { selector, ...options });
  });
}
