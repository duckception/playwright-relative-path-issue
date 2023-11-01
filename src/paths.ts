import path from "node:path";

export const POM_PATH = path.resolve(path.join("test", "e2e", "pom"));

export const OUT_DIR = path.resolve(
	path.join("dist", "nested-dist", "compiled-files"),
);
