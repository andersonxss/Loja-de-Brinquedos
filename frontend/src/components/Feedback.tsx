import React from "react";

type FeedbackProps = {
  message: string;
  type?: "success" | "error";
};

export function Feedback({ message, type = "error" }: FeedbackProps) {
  return (
    <div style={{ color: type === "success" ? "green" : "red", margin: 8 }}>
      {message}
    </div>
  );
}
