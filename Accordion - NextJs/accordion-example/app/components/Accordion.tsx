// components/Accordion.tsx
'use client';

import { useState } from 'react';

interface AccordionProps {
  title: string;
  content: string;
}

const Accordion = ({ title, content }: AccordionProps) => {
  const [isActive, setIsActive] = useState(false);

  const toggleAccordion = () => {
    setIsActive(!isActive);
  };

  return (
    <div>
      <button
        className={`accordion w-full bg-gray-300 hover:bg-slate-400 p-4 text-2xl text-left focus:outline-none transition-colors duration-300 flex justify-between items-center ${
          isActive ? 'bg-gray-400' : ''
        }`}
        onClick={toggleAccordion}
      >
        {/* Plus/Minus Sign */}
        <span>{title}</span>
        <span>{isActive ? '-' : '+'}</span>
      </button>
      <div
        className={`panel overflow-hidden transition-max-height duration-500 ease-in-out ${
          isActive ? 'max-h-96' : 'max-h-0'
        }`}
      >
        <p className='p-4 text-lg ml-2'>{content}</p>
      </div>
    </div>
  );
};

export default Accordion;
