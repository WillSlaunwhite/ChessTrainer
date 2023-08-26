/** @type {import('tailwindcss').Config} */
export default {
	purge: ["./src/**/*.{js,jsx,ts,tsx}"],
	darkMode: "false",
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {},
		fontFamily: {
			'mono': 'Monaco',
			'serif': 'Georgia',
		}
	},
	plugins: [],
};
