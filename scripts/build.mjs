import { marked } from "marked";
import fs from "node:fs/promises"
import { extname } from "node:path";

marked.use({
	gfm: true,
})


console.log('docs: building...')

const template = await fs.readFile("doc.template.html", { encoding: "utf-8" });

const files = await fs.readdir("docs", { encoding: "utf-8" });

const markdownFiles = files
	.filter((file) => extname(file) === ".md")
	.map((file) => "docs/" + file);

await fs.mkdir("dist/docs");

for (const file of markdownFiles) {
	const contents = await fs.readFile(file, { encoding: "utf-8" });
	const html = marked.parse(contents.replaceAll(/\.md/g, ".html"));
	await fs.writeFile(
		"dist/" + file.replace(".md", ".html"),
		template.replace(/\<slot\>[\s\S]*<\/slot\>/, html)
	);
}

console.log('docs: build complete')