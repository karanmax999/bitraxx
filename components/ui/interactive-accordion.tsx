"use client";

import { useRef, useState } from "react";

export interface AccordionItem {
  id: string;
  number: string;
  title: string;
  content: string;
}

interface UniqueAccordionProps {
  items: AccordionItem[];
  defaultOpen?: string;
}

function AccordionContent({ isActive, content }: { isActive: boolean; content: string }) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateRows: isActive ? "1fr" : "0fr",
        transition: "grid-template-rows 0.3s cubic-bezier(0.4,0,0.2,1)",
      }}
    >
      <div ref={ref} style={{ overflow: "hidden" }}>
        <p
          className="pl-16 pr-12 py-5 text-sm leading-relaxed"
          style={{
            color: "var(--text-muted)",
            opacity: isActive ? 1 : 0,
            transform: isActive ? "translateY(0)" : "translateY(-8px)",
            transition: "opacity 0.2s ease 0.08s, transform 0.2s ease 0.08s",
          }}
        >
          {content}
        </p>
      </div>
    </div>
  );
}

export function UniqueAccordion({ items, defaultOpen }: UniqueAccordionProps) {
  const [activeId, setActiveId] = useState<string | null>(defaultOpen ?? items[0]?.id ?? null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className="w-full">
      <div className="space-y-0">
        {items.map((item) => {
          const isActive  = activeId  === item.id;
          const isHovered = hoveredId === item.id;

          return (
            <div key={item.id}>
              <button
                onClick={() => setActiveId(isActive ? null : item.id)}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="w-full group relative"
              >
                <div className="flex items-center gap-6 py-5 px-1">
                  {/* Number bubble */}
                  <div className="relative flex items-center justify-center w-10 h-10 shrink-0">
                    <div
                      className="absolute inset-0 rounded-full transition-all duration-300"
                      style={{
                        backgroundColor: "var(--accent)",
                        transform: `scale(${isActive ? 1 : isHovered ? 0.85 : 0})`,
                        opacity: isActive ? 1 : isHovered ? 0.15 : 0,
                      }}
                    />
                    <span
                      className="relative z-10 text-sm font-bold tracking-wide font-['Orbitron',sans-serif] transition-colors duration-200"
                      style={{
                        color: isActive
                          ? "#000000"
                          : isHovered
                          ? "var(--accent)"
                          : "var(--text-muted)",
                      }}
                    >
                      {item.number}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    className="text-xl font-semibold tracking-tight font-['Orbitron',sans-serif] transition-all duration-200"
                    style={{
                      transform: `translateX(${isActive || isHovered ? 4 : 0}px)`,
                      color: isActive || isHovered ? "var(--text-primary)" : "var(--text-muted)",
                    }}
                  >
                    {item.title}
                  </h3>

                  {/* Plus / X indicator */}
                  <div className="ml-auto flex items-center">
                    <div
                      className="flex items-center justify-center w-8 h-8 transition-transform duration-300"
                      style={{ transform: `rotate(${isActive ? 45 : 0}deg)` }}
                    >
                      <svg
                        width="16" height="16" viewBox="0 0 16 16" fill="none"
                        className="transition-opacity duration-200"
                        style={{
                          opacity: isActive || isHovered ? 1 : 0.35,
                          color: "var(--accent)",
                        }}
                      >
                        <path
                          d="M8 1V15M1 8H15"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Static underline */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-px"
                  style={{ backgroundColor: "var(--border)" }}
                />
                {/* Animated gold underline */}
                <div
                  className="absolute bottom-0 left-0 h-px origin-left transition-transform duration-300"
                  style={{
                    backgroundColor: "var(--accent)",
                    transform: `scaleX(${isActive ? 1 : isHovered ? 0.3 : 0})`,
                    width: "100%",
                  }}
                />
              </button>

              <AccordionContent isActive={isActive} content={item.content} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default UniqueAccordion;
