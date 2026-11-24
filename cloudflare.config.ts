import { bindings, defineConfig, triggers } from "cf/config";

export default defineConfig({
	worker: {
		name: "kurz",
		compatibilityDate: "2025-10-01",
		entrypoint: "src/worker/index.ts",
		assets: {
			runWorkerFirst: true,
		},
		triggers: [
			triggers.scheduled({
				schedule: "17 3 * * *",
			}),
		],
		env: {
			DB: bindings.d1({
				name: "kurz",
			}),
			KV: bindings.kv({}),
			EMAIL: bindings.sendEmail({}),
			LIMITER: bindings.rateLimit({
				namespace: "1001",
				simple: {
					limit: 5,
					period: 60,
				},
			}),
			ASSETS: bindings.assets(),
		},
		// Note: `keep_vars` from wrangler.jsonc is not supported in cloudflare.config.ts.
		// Variables set in the Cloudflare dashboard will be managed separately.
	},
});
