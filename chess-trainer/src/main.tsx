import { ThemeProvider } from "@material-tailwind/react";
import ReactDOM from "react-dom/client";
import "../node_modules/tailwindcss/tailwind.css";
import App from "./App.tsx";
import "./index.scss";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<ThemeProvider>
		<App />
	</ThemeProvider>,
);
