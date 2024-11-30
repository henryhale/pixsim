import { marked } from "marked";
import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { extname } from "node:path";

marked.use({
	gfm: true,
	breaks: true,
})


console.log('docs: building...')

const template = await readFile("doc.temp.html", { encoding: "utf-8" });

const files = await readdir("docs", { encoding: "utf-8" });

const markdownFiles = files
	.filter((file) => extname(file) === ".md")
	.map((file) => "docs/" + file);

await mkdir("dist/docs");

for (const file of markdownFiles) {
	const contents = await readFile(file, { encoding: "utf-8" });
	const html = marked.parse(contents.replace(/\.md\)/g, ".html)"));
	await writeFile(
		"dist/" + file.replace(".md", ".html"),
		template.replace(/\<slot\>[\s\S]*<\/slot\>/, html)
	);
}

console.log('docs: build complete')