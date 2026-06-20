# Virtual Coffee Machine

Angular 13 front end + optional Node/Express API. Simulates brewing coffee with water/bean levels, cup sizes (Tall / Grande / Venti), grind, and brew delay.

**Live demo:** https://kevingnet.github.io/coffee.bitnami/ (client-side engine on GitHub Pages)

## Run locally (full stack)

```bash
cd coffee
chmod +x run-local.sh
./run-local.sh
```

- API: http://localhost:8081
- App: http://localhost:4200

Or separately:

```bash
cd coffee/coffee-node-app && npm install && node server.js
cd coffee/coffee-app && npm install --legacy-peer-deps && npm start
```

## Deploy

Push to `main` — GitHub Actions builds the Angular app and publishes to GitHub Pages.

Production uses an in-browser coffee engine (no backend required on Pages). Local dev talks to the Node API on port 8081.

## API

| Method | Path | Description |
|--------|------|-------------|
| GET | `/level` | Water & bean levels (0–100%) |
| POST | `/refill` | Refill water/beans |
| POST | `/brew` | Brew a cup (`cup_size`, `grain_size`, `delay`) |
