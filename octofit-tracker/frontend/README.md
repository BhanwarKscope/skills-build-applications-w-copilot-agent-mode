# Octofit Tracker Frontend

React 19 presentation tier for the Octofit Tracker multi-tier application.

## Environment

Define `VITE_CODESPACE_NAME` so the frontend can call the backend Codespaces URL:

```bash
VITE_CODESPACE_NAME=your-codespace-name
```

For local development, place that value in `.env.local`. API requests use:

```text
https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/[component]/
```

If `VITE_CODESPACE_NAME` is unset, the app falls back to relative `/api/[component]/` URLs to avoid generating `https://undefined-8000...` requests.
