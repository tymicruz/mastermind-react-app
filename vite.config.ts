import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const REPO_NAME = 'https://github.com/tymicruz/mastermind-react-app';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/mastermind-react-app",
})
