import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
	base: "/pixsim/",
	lang: "en-US",
	title: "PixSim",
	description: "A pixel-based led matrix display simulator",
	head: [["link", { rel: "icon", type: "image/xml+svg", href: "/pixsim/favicon.svg" }]],
	lastUpdated: true,
	ignoreDeadLinks: true,
	themeConfig: {
		// https://vitepress.dev/reference/default-theme-config

		logo: "/favicon.svg",

		search: {
			provider: "local",
		},

		socialLinks: [
			{ icon: "github", link: "https://github.com/henryhale/pixsim" },
			{ icon: "x", link: "https://x.com/henryhale" },
		],

		editLink: {
			text: "Edit this page on GitHub",
			pattern:
				"https://github.com/henryhale/pixsim/edit/master/docs/:path",
		},

		footer: {
			message:
				'Released under the <a href="https://github.com/henryhale/pixsim/blob/master/LICENSE.txt">MIT License</a>.',
			copyright:
				'Copyright © 2024-present <a href="https://github.com/henryhale">Henry Hale</a>',
		},

		nav: [
			{ text: "Home", link: "/" },
			{ text: "Guide", link: "/guide/" },
			{ text: "Playground", link: "/demo/" },
		],

		sidebar: [
			{
				text: "Getting Started",
				collapsed: false,
				items: [
					{ text: "What is PixSim?", link: "/guide/" },
					{ text: "Quick Start", link: "/guide/quickstart" },
				],
			},
			{
				text: "Components",
				collapsed: false,
				items: [
					{ text: "Display System", link: "/guide/display" },
					{ text: "Instruction Set", link: "/guide/isa" },
					{ text: "Assembly Language", link: "/guide/language" },
					{ text: "Virtual Chip", link: "/guide/chip" },
					{ text: "Character Encoding", link: "/guide/charset" },
					{ text: "Font System", link: "/guide/font" },
				]
			},
			{
				text: "Interactive Demos",
				items: [
					{ text: "🖥️ Matrix Display", link: "/demo/display" },
					{ text: "📝 Font Editor", link: "/demo/font" },
					{ text: "✨ Playground", link: "/demo/" },
				]
			},
			{
				text: "Contributing",
				collapsed: true,
				items: [
					{ text: "Development Setup", link: "/misc/dev-setup" },
					{ text: "Project Roadmap", link: "/misc/roadmap" },
				]
			}
		],

	},
});
