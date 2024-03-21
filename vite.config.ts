/** @type {import('vite').UserConfig} */

import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
	return {
		plugins: [react()],
		server: {
			open: true
			// port: 3000,
		},
		css: {
			preprocessorOptions: {
				scss: {
					includePaths: [path.join(__dirname, 'src/app//styles')],
					additionalData: `@import 'mixins';`
				}
			}
		},
		esbuild: {
			pure: mode === 'production' ? ['console.log'] : []
		},
		resolve: {
			alias: {
				'@': path.resolve(__dirname, './src/'),
				'@app': path.resolve(__dirname, './src/app/'),
				'@components': path.resolve(__dirname, './src/components'),
				'@shared': path.resolve(__dirname, './src/shared/')
			}
		},
		build: {
			rollupOptions: {
				output: {
					chunkFileNames: 'js/[name]-[hash].js',
					entryFileNames: 'js/[name]-[hash].js',

					assetFileNames: ({name}) => {
						if (/\.(gif|jpe?g|png|svg)$/.test(name ?? '')) {
							return 'images/[name]-[hash][extname]';
						}

						if (/\.css$/.test(name ?? '')) {
							return 'css/[name]-[hash][extname]';
						}

						// default value
						// ref: https://rollupjs.org/guide/en/#outputassetfilenames
						return 'assets/[name]-[hash][extname]';
					}
				}
			}
		}
	};
});
