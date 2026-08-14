import React from "react";
import { Plus, Minus } from "lucide-react";

interface FaqItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

export const FaqItem: React.FC<FaqItemProps> = ({
  question,
  answer,
  isOpen,
  onToggle,
}) => {
  return (
    <div
      className={`border-b border-espresso/10 transition-all duration-300 ${
        isOpen ? "pb-8" : "pb-0"
      }`}
    >
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between text-left py-7 focus:outline-none group"
      >
        <span
          className={`text-base font-black tracking-tight transition-colors duration-200 pr-8 ${
            isOpen ? "text-espresso" : "text-espresso/65 group-hover:text-espresso"
          }`}
        >
          {question}
        </span>
        <span
          className={`shrink-0 w-7 h-7 rounded-xl flex items-center justify-center transition-all duration-300 ${
            isOpen
              ? "bg-espresso text-white"
              : "bg-espresso/8 text-espresso/65 group-hover:bg-espresso/15"
          }`}
        >
          {isOpen ? <Minus size={13} /> : <Plus size={13} />}
        </span>
      </button>

      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="text-sm text-espresso/65 leading-relaxed font-light pr-12">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
};