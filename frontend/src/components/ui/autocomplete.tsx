import React, { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";

interface AutocompleteProps {
  suggestions: string[];
  value: string;
  onChange: (value: string) => void;
  onSelect?: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export const Autocomplete: React.FC<AutocompleteProps> = ({
  suggestions,
  value,
  onChange,
  onSelect,
  placeholder,
  className,
  disabled,
}) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Filtra sugestões conforme o valor digitado
  const filteredSuggestions = suggestions.filter((s) =>
    s.toLowerCase().includes(value.toLowerCase())
  );

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
        setActiveIndex(-1);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
    setShowSuggestions(true);
    setActiveIndex(-1);
  };

  const handleSelect = (suggestion: string) => {
    onChange(suggestion);
    setShowSuggestions(false);
    setActiveIndex(-1);
    if (onSelect) onSelect(suggestion);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions || filteredSuggestions.length === 0) return;
    if (e.key === "ArrowDown") {
      setActiveIndex((prev) =>
        prev < filteredSuggestions.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      setActiveIndex((prev) =>
        prev > 0 ? prev - 1 : filteredSuggestions.length - 1
      );
    } else if (e.key === "Enter" && activeIndex >= 0) {
      handleSelect(filteredSuggestions[activeIndex]);
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
      setActiveIndex(-1);
    }
  };

  return (
    <div className={"relative w-full " + (className || "")} ref={wrapperRef}>
      <Input
        value={value}
        onChange={handleInputChange}
        onFocus={() => setShowSuggestions(true)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        autoComplete="off"
      />
      {showSuggestions && filteredSuggestions.length > 0 && (
        <ul className="absolute z-10 mt-1 w-full bg-popover border border-border rounded-md shadow-lg max-h-48 overflow-auto">
          {filteredSuggestions.map((suggestion, idx) => (
            <li
              key={suggestion}
              className={`px-4 py-2 cursor-pointer select-none text-sm hover:bg-muted ${
                idx === activeIndex ? "bg-muted" : ""
              }`}
              onMouseDown={() => handleSelect(suggestion)}
              onMouseEnter={() => setActiveIndex(idx)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
