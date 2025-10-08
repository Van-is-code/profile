# VanDev Portfolio (local)

This is a minimal Vite + React portfolio scaffold with language toggle (EN/VI) and Tailwind CSS.

Run locally (Windows PowerShell):

```powershell
npm install
npm run dev
```

Notes:
- Tailwind is configured via `tailwind.config.cjs` and `postcss.config.cjs`.
- Replace the avatar placeholder in `src/data/vi.json` and `src/data/en.json` with your real image URL.
- The app stores language choice in `localStorage` under key `lang` (default: `en`).
