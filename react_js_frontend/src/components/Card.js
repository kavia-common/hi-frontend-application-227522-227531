import React from "react";
import "./Card.css";

/**
 * Generic container with surface styling.
 */
// PUBLIC_INTERFACE
export function Card({ as = "section", className = "", title, children, ...props }) {
  const Comp = as;
  return (
    <Comp className={["card", className].filter(Boolean).join(" ")} {...props}>
      {title ? <h3 className="cardTitle">{title}</h3> : null}
      <div className="cardBody">{children}</div>
    </Comp>
  );
}
