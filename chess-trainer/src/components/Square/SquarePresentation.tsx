import React, { useEffect, useState } from "react";
import { useDrag } from "react-dnd";
import BlackBishop from "../Pieces/black/BlackBishop";
import BlackKing from "../Pieces/black/BlackKing";
import BlackKnight from "../Pieces/black/BlackKnight";
import BlackPawn from "../Pieces/black/BlackPawn";
import BlackQueen from "../Pieces/black/BlackQueen";
import BlackRook from "../Pieces/black/BlackRook";
import WhiteBishop from "../Pieces/white/WhiteBishop";
import WhiteKing from "../Pieces/white/WhiteKing";
import WhiteKnight from "../Pieces/white/WhiteKnight";
import WhitePawn from "../Pieces/white/WhitePawn";
import WhiteQueen from "../Pieces/white/WhiteQueen";
import WhiteRook from "../Pieces/white/WhiteRook";


interface SquarePresentationProps {
	square: string;
	piece: string;
	selected: boolean;
	onClick: () => void;
	selectedSquare: string | null;
}

const pieceComponents: Record<string, React.FC> = {
	P: WhitePawn,
	R: WhiteRook,
	N: WhiteKnight,
	B: WhiteBishop,
	Q: WhiteQueen,
	K: WhiteKing,
	p: BlackPawn,
	r: BlackRook,
	n: BlackKnight,
	b: BlackBishop,
	q: BlackQueen,
	k: BlackKing,
};

interface WithDraggableProps {
	id: string;
}

export function withDraggable<T extends WithDraggableProps>(Component: React.ComponentType<T>, type: string) {
    return (props: T) => {
        const { id, ...otherProps } = props;
        const [coords, setCoords] = useState({ x: 0, y: 0 });
		
        const [{ isDragging }, dragRef, preview] = useDrag(() => ({
            type: 'piece',
            item: { id, type },
            collect: monitor => ({
                isDragging: !!monitor.isDragging(),
            }),
        }));


        useEffect(() => {
			const onMouseMove = (e: MouseEvent) => {
				if (isDragging) {
					console.log(`${e.clientX} ${e.clientY}`);
					setCoords({ x: e.clientX, y: e.clientY });
				}
			};
		
			document.addEventListener('mousemove', onMouseMove);
		
			return () => {
				document.removeEventListener('mousemove', onMouseMove);
			};
		}, [isDragging]);
		

        const style: any = isDragging ? { position: 'fixed', left: coords.x, top: coords.y, opacity: 0.5 } : {};

        return (
            <div ref={dragRef} style={style}>
                <Component {...otherProps as T} />
            </div>
        );
    }
}


const SquarePresentation: React.FC<SquarePresentationProps> = ({ square, piece, selected, onClick }) => {
	let DraggablePieceComponent = null;
    if (piece) {
        const PieceComponent = pieceComponents[piece];
        DraggablePieceComponent = withDraggable(PieceComponent, piece);
    }

	const fileToNum = { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8 };

	const isLightSquare = (square: string) => {
		const file = fileToNum[square.charAt(0) as keyof typeof fileToNum];
		const rank = parseInt(square.charAt(1));
		return (file + rank) % 2 === 0;
	};

	const backgroundColor = isLightSquare(square) ? "bg-light-square" : "bg-dark-square";

	return (
		<div
			className={`flex justify-center items-center w-full h-full ${backgroundColor} square ${selected ? "highlighted" : ""}`}
			onClick={onClick}
		>
			{DraggablePieceComponent && <DraggablePieceComponent id={`${piece}_${square}`}/>}
		</div>
	);
};

export default React.memo(SquarePresentation);