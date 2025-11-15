# AI Avatar Productivity Showcase

A cinematic, web-based experience where an AI avatar narrates a short script about free productivity tools while responsive “AI B-roll” visuals animate in sync. Built with Next.js and React for easy deployment to Vercel.

## ✨ Experience Highlights

- **AI narration** powered by the browser Speech Synthesis API with confident tone presets.
- **Responsive avatar** featuring reactive facial animations tied to narration playback.
- **Dynamic B-roll scenes** (clocks, futuristic HUDs, awareness silhouettes, and numbered tool flashes) that transition with each beat of the script.
- **Cinematic styling** using pure CSS animations and glassmorphism to deliver a polished, tech-forward presentation.

## 🚀 Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000` and click “Play narration” to trigger the full experience (audio output requires a browser with Speech Synthesis support).

## 🧱 Tech Stack

- Next.js 14 (App Router, TypeScript)
- React 18
- Framer Motion for scene transitions
- Modern CSS (custom keyframes, gradients, and glassmorphism)

## 🧭 Project Structure

```
src/
  app/
    page.tsx        # Main interactive experience
    layout.tsx      # Root layout + metadata
    globals.css     # Global styles, animations, and scene theming
package.json        # Scripts and dependencies
```

## 📦 Available Scripts

- `npm run dev` – Start the local development server.
- `npm run build` – Create an optimized production build.
- `npm start` – Serve the production build locally.
- `npm run lint` – Run ESLint checks.

## 📄 License

Released under the MIT License.
