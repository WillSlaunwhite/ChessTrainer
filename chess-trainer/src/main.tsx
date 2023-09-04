import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.scss";
import "/src/components/chessboard/chessboard.scss";
import "../node_modules/tailwindcss/tailwind.css";
import { ThemeProvider } from "@material-tailwind/react";

ReactDOM.createRoot(document.getElementById("root")!).render(
		<ThemeProvider>
			<App />
		</ThemeProvider>
);
