import React, { useState, useRef } from "react";
import { Input } from "@/components/ui/input";

interface InputCurrencyProps {
  value: number | string;
  onChange: (value: number) => void;
  label?: string;
  id?: string;
  name?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  message?: string;
  validate?: boolean;
}

export const InputCurrency: React.FC<InputCurrencyProps> = ({
  value,
  onChange,
  label,
  id,
  name,
  placeholder = "R$ 0,00",
  disabled,
  className,
  message,
  validate,
}) => {
  const [displayValue, setDisplayValue] = useState(() =>
    typeof value === "number"
      ? value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
      : value
  );
  const inputRef = useRef<HTMLInputElement>(null);

  const formatCurrency = (val: string | number) => {
    const num =
      typeof val === "number"
        ? val
        : Number(val.toString().replace(/\D/g, "")) / 100;
    return num.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let raw = e.target.value.replace(/\D/g, "");
    if (!raw) raw = "0";
    const num = Number(raw) / 100;
    setDisplayValue(formatCurrency(num));
    onChange(num);
  };

  // Atualiza displayValue se value mudar externamente
  React.useEffect(() => {
    if (typeof value === "number") {
      setDisplayValue(formatCurrency(value));
    }
  }, [value]);

  return (
    <div className={className}>
      {label && (
        <label htmlFor={id} className="text-sm font-medium">
          {label}
        </label>
      )}
      <Input
        ref={inputRef}
        id={id}
        name={name}
        value={displayValue}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={disabled}
        inputMode="decimal"
        autoComplete="off"
      />
      {validate && message && (
        <p className="text-sm text-destructive">{message}</p>
      )}
    </div>
  );
};
