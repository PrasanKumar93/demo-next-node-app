#!/usr/bin/env bash

set -euo pipefail
set -m

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

echo "Repo root: $ROOT_DIR"

echo "Starting backend..."
(
  cd "$ROOT_DIR/backend"
  npm run dev
) &
BACKEND_PID=$!

echo "Starting frontend..."
(
  cd "$ROOT_DIR/frontend"
  npm run dev
) &
FRONTEND_PID=$!

cleanup() {
  echo "Stopping dev servers..."
  kill "$BACKEND_PID" "$FRONTEND_PID" 2>/dev/null || true
}

trap cleanup SIGINT SIGTERM

wait "$BACKEND_PID" "$FRONTEND_PID"
