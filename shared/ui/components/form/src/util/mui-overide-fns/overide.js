export default function overide(mainElement, { selector, style = null, className = '' }) {
  if (!mainElement) return;
  const elements = mainElement.querySelectorAll(selector);
  elements.forEach((element) => {
    style &&
      Object.entries(style).forEach(([prop, val]) => {
        element.style[prop] = val;
      });
    className && element.classList.add(className);
  });
}
