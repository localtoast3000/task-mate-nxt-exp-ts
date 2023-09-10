interface OverideOptions {
  selector: string;
  style: { [key: string]: string } | null;
  className: string;
}

export default function overide(
  mainElement: HTMLElement | null,
  { selector, style = null, className = '' }: OverideOptions
): void {
  if (!mainElement) return;
  const elements = mainElement.querySelectorAll<HTMLElement>(selector);
  elements.forEach((element) => {
    if (style)
      Object.entries(style).forEach(([prop, val]) => {
        element.style[prop as any] = val;
      });
    className && element.classList.add(className);
  });
}
