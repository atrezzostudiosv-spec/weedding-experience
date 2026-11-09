import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://atrezzostudiosv-spec.github.io',
  base: '/weedding-experience',
  trailingSlash: 'always',
  output: 'static',
  build: { format: 'directory' },
  devToolbar: { enabled: false }
});
