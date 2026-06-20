#!/usr/bin/env bash
# Run locally: Node API + Angular dev server
set -euo pipefail
ROOT="$(cd "$(dirname "$0")" && pwd)"

API_PID=""
cleanup() {
  [[ -n "$API_PID" ]] && kill "$API_PID" 2>/dev/null || true
}
trap cleanup EXIT

cd "$ROOT/coffee-node-app"
npm install --silent
node server.js &
API_PID=$!

cd "$ROOT/coffee-app"
npm install --legacy-peer-deps --silent
echo "API: http://localhost:8081  |  App: http://localhost:4200"
npm start
