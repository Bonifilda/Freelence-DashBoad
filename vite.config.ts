
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'; // ✅ Import Tailwind plugin
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
    tailwindcss(), // ✅ Enable Tailwind CSS v4
  ],
});



