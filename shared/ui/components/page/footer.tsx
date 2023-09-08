'use client';
import React, { useRef, useEffect, RefObject, PropsWithChildren } from 'react';

interface FooterProps extends PropsWithChildren {
  getRef?: (ref: RefObject<HTMLElement>) => void;
}

export default function Footer({ getRef }: FooterProps) {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (getRef) {
      getRef(footerRef);
    }
  }, [getRef]);

  return <footer ref={footerRef}></footer>;
}
