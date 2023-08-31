import { useState } from "react";
import "./App.scss";
import GameView from "./views/game-view";
import HomeView from "./views/home-view";

function App() {
	const [fen, setFen] = useState("r1bqk1nr/pppp1ppp/2n5/2b1p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4");
	const [isQuizActive, setIsQuizActive] = useState(false);

	const questions = [
		{
			fen: "r1bqk1nr/pppp1ppp/2n5/2b1p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4",
			correctMove: "c3",
			correctExplanation: "This move prepares d4 and gains central space.",
			incorrectExplanation: "c3 is the best move because it prepares d4 and gains central space.",
		},
		{
			fen: "r1bqk1nr/pppp1ppp/2n5/2b1p3/2B1P3/2P2N2/PP1P1PPP/RNBQK2R b KQkq - 0 4",
			correctMove: "Nf6",
			correctExplanation: "Develops a piece and attacks the e4 pawn.",
			incorrectExplanation: "Nf6 is the best move because it develops a piece and attacks the e4 pawn.",
		},
		{
			fen: "r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1P3/2P2N2/PP1P1PPP/RNBQK2R w KQkq - 1 5",
			correctMove: "d3",
			correctExplanation: "This move supports the e4 pawn and prepares to develop the dark square bishop.",
			incorrectExplanation: "d3 is the best move because it supports the e4 pawn and prepares to develop the dark square bishop.",
		},
		{
			fen: "r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1P3/2PP1N2/PP3PPP/RNBQK2R b KQkq - 0 5",
			correctMove: "d6",
			correctExplanation: "This move supports the e5 pawn and prepares to develop the dark square bishop.",
			incorrectExplanation: "d6 is the best move because it supports the e5 pawn and prepares to develop the dark square bishop.",
		},
		{
			fen: "r1bqk2r/ppp2ppp/2np1n2/2b1p3/2B1P3/2PP1N2/PP3PPP/RNBQK2R w KQkq - 0 6",
			correctMove: "O-O",
			correctExplanation:
				"Castling is always a good idea if there are no immediate tactics or threats. It brings the king to safety and connects the rooks.",
			incorrectExplanation: "Castling is the best move because it brings the king to safety and connects the rooks.",
		},
		{
			fen: "r1bq1rk1/ppp2ppp/2np1n2/2b1p3/2B1P3/2PP1N2/PP3PPP/RNBQ1RK1 b - - 1 6",
			correctMove: "O-O",
			correctExplanation:
				"Castling is always a good idea if there are no immediate tactics or threats. It brings the king to safety and connects the rooks.",
			incorrectExplanation: "Castling is the best move because it brings the king to safety and connects the rooks.",
		},
		{
			fen: "r1bq1rk1/ppp2ppp/2np1n2/2b1p3/2B1P3/2PP1N2/PP3PPP/RNBQ1RK1 w - - 2 7",
			correctMove: "Nbd2",
			correctExplanation: "Develops a piece, supports e4, and prepares to reroute the knight to a better square.",
			incorrectExplanation:
				"Nbd2 is the best move because it develops a piece, supports e4, and prepares to reroute the knight to a better square.",
		},
	];

	const [quizState, setQuizState] = useState({
		questions: questions,
		currentQuestionIndex: 0,
		isCorrect: null,
	});

	const [boardState, setBoardState] = useState({
		fen: "",
		move: "",
	});

	return (
		<div className="app-container h-screen w-screen bg-blue-gray-50 flex flex-column justify-center items-center overflow-hidden">
			{!isQuizActive ? (
				<div className="home-view w-full h-full">
					<HomeView setFen={setFen} setIsQuizActive={setIsQuizActive}></HomeView>
				</div>
			) : (
				<div className="game-view w-full h-full">
					<GameView fen={fen} questions={questions} setFen={setFen}></GameView>
				</div>
			)}
			{/* <WelcomeScreenComponent boardState={boardState} setBoardState={setBoardState} setQuizState={setQuizState}></WelcomeScreenComponent> */}
		</div>
	);
}

export default App;
