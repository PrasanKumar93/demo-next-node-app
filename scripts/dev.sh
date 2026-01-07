#!/usr/bin/env bash
set -euo pipefail
set -m

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
echo "Repo root: $ROOT_DIR"

install_if_needed () {
  local dir="$1"
  if [[ ! -d "$dir/node_modules" ]]; then
    echo "Installing deps in $dir..."
    (cd "$dir" && npm install)
  else
    echo "Deps already installed in $dir"
  fi
}

install_if_needed "$ROOT_DIR/backend"
install_if_needed "$ROOT_DIR/frontend"

echo "Starting backend..."
(cd "$ROOT_DIR/backend" && npm run dev) &
BACKEND_PID=$!

echo "Starting frontend..."
(cd "$ROOT_DIR/frontend" && npm run dev) &
FRONTEND_PID=$!

trap 'kill "$BACKEND_PID" "$FRONTEND_PID" 2>/dev/null || true' INT TERM
wait "$BACKEND_PID" "$FRONTEND_PID"
