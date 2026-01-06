import React from "react";
import "./Button.css";

/**
 * Shared button component for consistent styling.
 *
 * Variants:
 * - primary: main call-to-action
 * - secondary: supporting action
 */
// PUBLIC_INTERFACE
export function Button({
  variant = "primary",
  size = "md",
  as = "button",
  className = "",
  children,
  ...props
}) {
  const Comp = as;
  const classes = ["btn", `btn--${variant}`, `btn--${size}`, className]
    .filter(Boolean)
    .join(" ");

  return (
    <Comp className={classes} {...props}>
      {children}
    </Comp>
  );
}
