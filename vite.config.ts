import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Define que "@" agora aponta para a pasta "src"
      '@': path.resolve(__dirname, './src'),
    },
  },
  base: '/distStatus/',
  // server: {
  //   proxy: {
  //     // Quando sua aplicação chamar '/api-externa/arquivo'
  //     '/api-externa': {
  //       // Redireciona para o domínio real
  //       target: 'https://cbaplang.corpodebombeiros.sp.gov.br/hidrantes/08prefeiturasp/prefeiturasp_hidrantesmanutencao.xlsx',
  //       changeOrigin: true, // Necessário para hosts virtuais
  //       secure: false,
  //       // Opcional: reescreve o caminho se necessário
  //       // rewrite: (path) => path.replace(/^\/api-externa/, '')
  //     },
  //   },
  // },
})
