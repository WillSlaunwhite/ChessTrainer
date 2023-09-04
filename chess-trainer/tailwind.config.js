import withMT from "@material-tailwind/react/utils/withMT";
/** @type {import('tailwindcss').Config} */
import tailwindcssRipple from "tailwindcss-ripple";

export default withMT({
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	darkMode: '"false"',
	theme: {
		extend: {
			colors: {
				'dark-square': '#7d5426',
				'light-square': '#e6d9bc',
				light: {
					50: "#fff",
					100: "#fcfcfc",
					200: "#f7f7f7",
					300: "#ececec",
					400: "#e8e8e8",
					500: "#e1e1e1",
					600: "#dbdbdb",
				}
			}
		},
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
	plugins: [
		tailwindcssRipple
	],
});
