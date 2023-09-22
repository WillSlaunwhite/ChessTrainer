import { ThemeProvider } from "@material-tailwind/react";
import ReactDOM from "react-dom/client";
import "../node_modules/tailwindcss/tailwind.css";
import App from "./App.tsx";
import "./index.scss";
import "/src/components/game/chessboard/chessboard.scss";
import React from "react";
import { QuizInteractionProvider } from "./contexts/quiz/quiz-context.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<ThemeProvider>
			<QuizInteractionProvider>
				<App />
			</QuizInteractionProvider>
		</ThemeProvider>
	</React.StrictMode>,
);
