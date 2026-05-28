import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react({ jsxRuntime: 'automatic' })],
  // Let Vite/esbuild handle JSX for .js/.jsx files.
  // (OXC can be enabled by default in newer Vite versions and may parse JSX incorrectly.)
  oxc: { jsx: false },
  esbuild: {
    jsx: 'automatic',
  },
});










