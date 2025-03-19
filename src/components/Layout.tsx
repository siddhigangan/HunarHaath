
import { ReactNode } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bamboo-texture">
      <div className="absolute top-0 left-0 w-8 h-64 opacity-10 -rotate-12 pointer-events-none">
        <svg viewBox="0 0 100 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path d="M50 0V400" stroke="#606C38" strokeWidth="15" strokeLinecap="round" />
          <path d="M50 50H80" stroke="#606C38" strokeWidth="4" strokeLinecap="round" />
          <path d="M50 100H75" stroke="#606C38" strokeWidth="4" strokeLinecap="round" />
          <path d="M50 150H85" stroke="#606C38" strokeWidth="4" strokeLinecap="round" />
          <path d="M50 200H70" stroke="#606C38" strokeWidth="4" strokeLinecap="round" />
          <path d="M50 250H80" stroke="#606C38" strokeWidth="4" strokeLinecap="round" />
          <path d="M50 300H75" stroke="#606C38" strokeWidth="4" strokeLinecap="round" />
          <path d="M50 350H85" stroke="#606C38" strokeWidth="4" strokeLinecap="round" />
        </svg>
      </div>
      
      <div className="absolute top-10 right-0 w-12 h-72 opacity-10 rotate-12 pointer-events-none">
        <svg viewBox="0 0 100 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path d="M50 0V400" stroke="#606C38" strokeWidth="15" strokeLinecap="round" />
          <path d="M50 50H80" stroke="#606C38" strokeWidth="4" strokeLinecap="round" />
          <path d="M50 100H75" stroke="#606C38" strokeWidth="4" strokeLinecap="round" />
          <path d="M50 150H85" stroke="#606C38" strokeWidth="4" strokeLinecap="round" />
          <path d="M50 200H70" stroke="#606C38" strokeWidth="4" strokeLinecap="round" />
          <path d="M50 250H80" stroke="#606C38" strokeWidth="4" strokeLinecap="round" />
          <path d="M50 300H75" stroke="#606C38" strokeWidth="4" strokeLinecap="round" />
          <path d="M50 350H85" stroke="#606C38" strokeWidth="4" strokeLinecap="round" />
        </svg>
      </div>
      
      <Navbar />
      <main className="flex-grow relative z-10">{children}</main>
      <Footer />
    </div>
  );
}
