import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'@': '/src',
		},
	},
	/* server: {
		proxy: {
			'/api': {
				target: 'http://api.enugu-jobs.com/api/v1',
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, '')
			}
		}
	} */
	/* server:
    process.env.NODE_ENV === 'development'
      ? {
          port: 5173,
          proxy: {
            '/api': {
              target: 'http://api.enugu-jobs.com/',
              changeOrigin: true,
              secure: false,
            },
          },
        }
      : {}, */
})
