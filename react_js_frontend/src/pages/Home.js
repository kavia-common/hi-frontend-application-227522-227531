import React, { useEffect, useMemo, useState } from "react";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { EnvironmentPanel } from "../components/EnvironmentPanel";
import { getRuntimeEnv } from "../config/env";
import "../App.css";

function normalizeBase(base) {
  if (!base) return "";
  // Avoid double slashes when building URLs
  return base.replace(/\/+$/, "");
}

async function safeFetch(url, { timeoutMs = 4000 } = {}) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const resp = await fetch(url, { signal: controller.signal });
    return { ok: resp.ok, status: resp.status };
  } finally {
    clearTimeout(timeoutId);
  }
}

// PUBLIC_INTERFACE
export function Home() {
  const env = useMemo(() => getRuntimeEnv(), []);
  const apiBase = normalizeBase(env.REACT_APP_API_BASE);
  const backendConfigured = Boolean(env.REACT_APP_BACKEND_URL || env.REACT_APP_API_BASE);

  const [apiStatus, setApiStatus] = useState({
    state: apiBase ? "checking" : "idle",
    detail: apiBase ? "Checking API…" : "API base not set (no-op).",
  });

  useEffect(() => {
    let mounted = true;

    async function run() {
      if (!apiBase) return;

      try {
        const result = await safeFetch(`${apiBase}/health`).catch(() => null);

        if (!mounted) return;

        if (result && result.ok) {
          setApiStatus({ state: "ok", detail: `API reachable (HTTP ${result.status}).` });
        } else if (result) {
          setApiStatus({ state: "warn", detail: `API responded (HTTP ${result.status}).` });
        } else {
          setApiStatus({ state: "error", detail: "API request failed (network/timeout)." });
        }
      } catch (e) {
        if (!mounted) return;
        setApiStatus({ state: "error", detail: "API request failed (network/timeout)." });
      }
    }

    run();
    return () => {
      mounted = false;
    };
  }, [apiBase]);

  const dotClass = backendConfigured ? "dot dotOk" : "dot";

  return (
    <main className="main">
      <section className="hero">
        <div className="container">
          <div className="heroGrid">
            <div>
              <div className="heroKicker">
                <span className="pill">Ocean Professional</span>
                <span>React Single Page App</span>
              </div>

              <h1 className="heroTitle">Hi — a modern React starter, ready to grow.</h1>
              <p className="heroSubtitle">
                Responsive layout, reusable components, routing structure, and an environment panel to
                confirm runtime configuration. Designed with subtle depth, rounded corners, and smooth
                transitions.
              </p>

              <div className="heroActions" aria-label="Primary actions">
                <Button
                  variant="primary"
                  size="lg"
                  as="a"
                  href="#features"
                >
                  Explore features
                </Button>
                <Button
                  variant="secondary"
                  size="lg"
                  as="a"
                  href="#environment"
                >
                  View environment
                </Button>
              </div>

              <div className="statusRow" aria-label="Configuration status">
                <span className="badge">
                  <span className={dotClass} aria-hidden="true" />
                  <span>
                    Backend configured: <strong>{backendConfigured ? "Yes" : "No"}</strong>
                  </span>
                </span>

                <span className="badge">
                  <span className="sr-only">API status:</span>
                  <strong>API</strong>: {apiStatus.detail}
                </span>
              </div>
            </div>

            <div>
              <Card title="Quick start checklist" aria-label="Quick start checklist">
                <ul style={{ margin: 0, paddingLeft: 18 }}>
                  <li>Confirm env vars below in “Environment”.</li>
                  <li>Set <code>REACT_APP_API_BASE</code> to enable the health fetch.</li>
                  <li>Expand routing by adding routes under <code>/src/pages</code>.</li>
                </ul>
                <p className="smallNote" style={{ marginTop: 12 }}>
                  The fetch call targets <code>{apiBase ? `${apiBase}/health` : "(disabled)"}</code> and
                  safely no-ops if unset.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="features">
        <div className="container">
          <h2 className="sectionTitle">Features</h2>
          <p className="sectionSubtitle">
            A lightweight foundation that stays self-contained and preview-friendly on port 3000.
          </p>

          <div className="grid3" role="list" aria-label="Feature cards">
            <Card title="Reusable components" role="listitem">
              Button + Card components provide consistent styling and accessible focus states.
            </Card>
            <Card title="Routing-ready" role="listitem">
              React Router is wired with a single route today, ready for more pages tomorrow.
            </Card>
            <Card title="Env visibility" role="listitem">
              A read-only Environment panel helps developers confirm runtime values quickly.
            </Card>
          </div>
        </div>
      </section>

      <section className="section" id="environment">
        <div className="container">
          <h2 className="sectionTitle">Settings</h2>
          <p className="sectionSubtitle">Developer-focused panel for configuration verification.</p>
          <EnvironmentPanel />
        </div>
      </section>
    </main>
  );
}
