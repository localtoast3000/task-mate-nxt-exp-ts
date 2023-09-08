'use client';
import React, { useRef, useEffect, RefObject, PropsWithChildren } from 'react';
import { Navbar, Footer } from 'shared.ui/components/page/exports';

interface PageLayoutProps extends PropsWithChildren {
  navbar?: boolean;
  footer?: boolean;
  mainContainerClass?: string;
  getNavbarContainerRef?: (ref: RefObject<HTMLDivElement>) => void;
  getMainContainerRef?: (ref: RefObject<HTMLElement>) => void;
  getFooterContainerRef?: (ref: RefObject<HTMLElement>) => void;
}

export default function PageLayout({
  navbar = true,
  footer = true,
  mainContainerClass,
  getNavbarContainerRef,
  getMainContainerRef,
  getFooterContainerRef,
  children,
}: PageLayoutProps) {
  let navbarContainerRef = useRef<HTMLDivElement>(null);
  let footerContainerRef = useRef<HTMLElement>(null);
  const mainContainerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (getNavbarContainerRef) {
      getNavbarContainerRef(navbarContainerRef);
    }
    if (getFooterContainerRef) {
      getFooterContainerRef(footerContainerRef);
    }
    if (getMainContainerRef) {
      getMainContainerRef(mainContainerRef);
    }
  }, [getNavbarContainerRef, getMainContainerRef, getFooterContainerRef]);

  return (
    <>
      {navbar ? <Navbar getRef={(ref) => (navbarContainerRef = ref)} /> : <></>}
      <main
        ref={mainContainerRef}
        className={`${mainContainerClass ? mainContainerClass : ''}`}>
        {children}
      </main>
      {footer ? <Footer getRef={(ref) => (footerContainerRef = ref)} /> : <></>}
    </>
  );
}
