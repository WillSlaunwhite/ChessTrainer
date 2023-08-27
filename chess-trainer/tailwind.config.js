import withMT from "@material-tailwind/react/utils/withMT";
/** @type {import('tailwindcss').Config} */

export default withMT({
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	darkMode: '"false"',
	theme: {
		extend: {},
		fontFamily: {
			mono: "Monaco",
			sans: "Kanit",
		},
		screens: {
      'tablet': '640px',
      // => @media (min-width: 640px) { ... }

      'laptop': '1024px',
      // => @media (min-width: 1024px) { ... }

      'desktop': '1280px',
      // => @media (min-width: 1280px) { ... }
    },
	},
	ripple: (theme) => ({
		colors: theme("colors"),
	}),
	plugins: [],
});
