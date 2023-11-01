import path from "node:path";
import chalk from "chalk";
import { OUT_DIR } from "./paths";

async function importTest() {
	const file = path.join(OUT_DIR, "playwright-dev-page.mjs");

	console.log("⏳ Importing file:", chalk.cyan(file));

	await import(file);

	console.log(`✅ Import ${chalk.greenBright.bold("SUCCESSFUL")}!`);
}

(async () => {
	await importTest();
})();
