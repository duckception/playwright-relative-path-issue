import path from "node:path";
import { glob } from "glob";
import { build } from "tsup";
import { OUT_DIR, POM_PATH } from "./paths";

/// Fixes: Error: Cannot find module '../package.json'
const PLAYWRIGHT_RELATIVE_PACKAGE_IMPORT_FIX = `
// ---- PLAYWRIGHT_RELATIVE_PACKAGE_IMPORT_FIX START ----

var originalRequireResolve = require.resolve;
require.resolve = (id, ...args) => {
  if (id === "../package.json") {
    id = require("node:path").join(process.cwd(), "package.json");
  }
  return originalRequireResolve(id, ...args);
}

// ---- PLAYWRIGHT_RELATIVE_PACKAGE_IMPORT_FIX END ----
`;

/// Fixes: https://github.com/evanw/esbuild/issues/1921
/// ^ this is unrelated to Playwright
const DYNAMIC_REQUIRE_FS_FIX = `
/// ---- DYNAMIC_REQUIRE_FS_FIX START ----

var require = (await import("node:module")).createRequire(import.meta.url);
var __filename = (await import("node:url")).fileURLToPath(import.meta.url);
var __dirname = (await import("node:path")).dirname(__filename);

/// ---- DYNAMIC_REQUIRE_FS_FIX END ----
`.trimStart();

const GLOB_PATTERN = path.join(POM_PATH, "**", "*.ts");

export async function compile() {
	await build({
		name: "playwright-relative-path-issue",
		entry: await glob(GLOB_PATTERN),
		clean: true,
		outDir: OUT_DIR,
		format: "esm",
		splitting: true,
		sourcemap: false,
		config: false,
		banner: {
			js: [
				DYNAMIC_REQUIRE_FS_FIX,
				PLAYWRIGHT_RELATIVE_PACKAGE_IMPORT_FIX
			].join(""),
		},
	});
}

(async () => {
	await compile();
})();
