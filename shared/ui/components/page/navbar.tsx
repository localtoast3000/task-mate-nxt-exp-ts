'use client';
import React, { useRef, useEffect, RefObject } from 'react';
import { Logo } from 'shared.ui/components/graphics/exports';

interface NavbarProps {
  getRef: (ref: RefObject<HTMLDivElement>) => void;
}

export default function Navbar({ getRef }: NavbarProps) {
  const navbarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (getRef) {
      getRef(navbarRef);
    }
  }, [getRef]);

  return (
    <div
      ref={navbarRef}
      className='navbar bg-base-200'>
      <div className='navbar-start'>
        <a href='/'>
          <Logo className='text-[1.2rem]' />
        </a>
      </div>
    </div>
  );
}
