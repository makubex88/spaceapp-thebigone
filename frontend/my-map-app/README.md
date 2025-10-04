# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

# Through the Radar Looking Glass: The Big One

---

## The Looming Threat

**The “Big One” in Metro Manila**

- West Valley Fault capable of **M7.2 quake**
- Recurs every **200–400 years** (last in 1600s)
- Potential impacts:
  - **168,000 buildings collapsed**
  - **33,000 deaths** in NCR + nearby provinces

📍 Focus: Rizal & Metro Manila — fault passes through urban core.

*Background suggestion: map of West Valley Fault overlaying Manila.*

---

## Through the Radar Looking Glass

**What SAR Reveals**

- **Before:** Stable radar signatures
  - Cities → bright, consistent
  - Water/wetlands → dark, smooth
- **After (hypothetical Big One):**
  - InSAR fringes → displacement
  - Coherence loss → liquefaction/flooding
  - Backscatter change → landslides, collapse

*"SAR exposes scars invisible to the human eye."*

*Background suggestion: InSAR fringes image with annotations.*

---

## From Data to Action

**SAR + Context = Preparedness**

- Combine SAR with:
  - DEM → landslide risk
  - Population maps → vulnerable zones
  - Infrastructure overlays → priority response
- Storytelling with radar = *science for resilience*

**“The Big One is not if — but when.  
Our best defense is preparation guided by data.”**

*Background suggestion: radar + Manila skyline fade.*

