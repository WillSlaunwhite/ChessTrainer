/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line @typescript-eslint/no-var-requires
// const tailwindRipple = require("tailwindcss-ripple");

export default {
	purge: ["./src/**/*.{js,jsx,ts,tsx}"],
	darkMode: "false",
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		ripple: (theme) => ({
			colors: theme("colors"),
		}),
		extend: {},
		fontFamily: {
			mono: "Monaco",
			serif: "Georgia",
		},
	},
	plugins: [],
};
