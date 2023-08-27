import withMT from "@material-tailwind/react/utils/withMT";
/** @type {import('tailwindcss').Config} */
import tailwindRipple from "tailwindcss-ripple";

export default withMT({
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	darkMode: '"false"',
	theme: {
		extend: {},
		fontFamily: {
			mono: "Monaco",
			sans: "Kanit",
		},
	},
	ripple: (theme) => ({
		colors: theme("colors"),
	}),
	plugins: [tailwindRipple],
});
