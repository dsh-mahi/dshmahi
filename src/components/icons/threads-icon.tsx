import * as React from "react";

const ThreadsIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
  >
    <path d="M12 22a10 10 0 0 0 10-10H2a10 10 0 0 0 10 10Z"/>
    <path d="M12 2a10 10 0 0 0-10 10c0 4.42 2.866 8.11 6.835 9.49"/>
    <path d="M12 2a10 10 0 0 1 10 10c0 4.42-2.866 8.11-6.835 9.49"/>
  </svg>
);

export default ThreadsIcon;
