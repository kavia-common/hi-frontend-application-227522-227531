import React from "react";
import { Card } from "./Card";
import { getRuntimeEnv } from "../config/env";
import "./EnvironmentPanel.css";

function MaskedValue({ value }) {
  if (!value) return <span className="envEmpty">(not set)</span>;
  return <code className="envValue">{value}</code>;
}

// PUBLIC_INTERFACE
export function EnvironmentPanel() {
  const env = getRuntimeEnv();

  const rows = [
    ["REACT_APP_API_BASE", env.REACT_APP_API_BASE],
    ["REACT_APP_BACKEND_URL", env.REACT_APP_BACKEND_URL],
    ["REACT_APP_FRONTEND_URL", env.REACT_APP_FRONTEND_URL],
    ["REACT_APP_WS_URL", env.REACT_APP_WS_URL],
    ["REACT_APP_NODE_ENV", env.REACT_APP_NODE_ENV],
  ];

  return (
    <Card title="Environment" aria-label="Environment configuration">
      <p className="envIntro">
        Read-only view of the key <code>REACT_APP_*</code> values available to this build.
      </p>

      <div className="envTable" role="table" aria-label="Runtime environment variables">
        {rows.map(([k, v]) => (
          <div className="envRow" role="row" key={k}>
            <div className="envKey" role="cell">
              {k}
            </div>
            <div className="envVal" role="cell">
              <MaskedValue value={v} />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
