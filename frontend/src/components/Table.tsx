import React from "react";

type TableProps<T> = {
  columns: { label: string; render: (row: T) => React.ReactNode }[];
  data: T[];
};

export function Table<T>({ columns, data }: TableProps<T>) {
  return (
    <table>
      <thead>
        <tr>
          {columns.map((col, idx) => (
            <th key={idx}>{col.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr key={i}>
            {columns.map((col, idx) => (
              <td key={idx}>{col.render(row)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
