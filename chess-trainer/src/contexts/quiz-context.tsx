interface QuizState {
  currentLine: number;
  currentMoveIndex: number;
  score: number;
  wrongMoves: { line: number; move: number }[];
  finished: boolean;
}

interface QuizState {
  currentLine: number;
  currentMoveIndex: number;
  score: number;
  wrongMoves: { line: number; move: number }[];
  finished: boolean;
}

const initialState: QuizState = {
  currentLine: 0,
  currentMoveIndex: 0,
  score: 0,
  wrongMoves: [],
  finished: false,
};
