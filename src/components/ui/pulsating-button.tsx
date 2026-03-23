import React from "react";
import { Link } from "react-router";

export function PulsatingButton({ 
  children, 
  to,
  className,
  containerClassName
}: { 
  children: React.ReactNode; 
  to?: string;
  className?: string;
  containerClassName?: string;
}) {
  const innerContent = (
    <span className={`relative block bg-[#080617] text-[#fbe9ff] px-8 sm:px-10 py-4 sm:py-5 rounded-full font-bold text-lg sm:text-xl hover:bg-black transition-colors shadow-xl z-10 ${className || ""}`}>
      {children}
    </span>
  );

  return (
    <div className={`relative inline-block w-fit group ${containerClassName || ""}`}>
      {/* Outer Glow Pulse */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#080617] rounded-full animate-ping opacity-30 [animation-duration:2.5s] pointer-events-none" />
      {/* Inner strong glow */}
      <div className="absolute inset-[-4px] rounded-full bg-[#080617] blur-md opacity-40 group-hover:opacity-60 transition-opacity pointer-events-none z-0" />
      
      {to ? (
        <Link to={to} className="relative z-10 block">
          {innerContent}
        </Link>
      ) : (
        <button className="relative z-10 block">
          {innerContent}
        </button>
      )}
    </div>
  );
}
