'use client';

import React, { FC, useEffect, useState } from 'react';
import {Boxes} from "lucide-react";
interface BoardData {
    [key: number]: string;
}

const WINNING_COMBO: number[][] = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const HomeComponent: FC = () => {
    const [xTurn, setXTurn] = useState<boolean>(true);
    const [won, setWon] = useState<boolean>(false);
    const [wonCombo, setWonCombo] = useState<number[]>([]);
    const [boardData, setBoardData] = useState<BoardData>({
        0: '',
        1: '',
        2: '',
        3: '',
        4: '',
        5: '',
        6: '',
        7: '',
        8: ''
    });
    const [isDraw, setIsDraw] = useState<boolean>(false);
    const [modalTitle, setModalTitle] = useState<string>('');

    useEffect(() => {
        checkWinner();
        checkDraw();
    }, [boardData]);

    const updateBoardData = (idx: number): void => {
        if (!boardData[idx] && !won) {
            let value: string = xTurn ? 'X' : 'O';
            setBoardData({ ...boardData, [idx]: value });
            setXTurn(!xTurn);
        }
    };

    const checkDraw = (): void => {
        let check: boolean = Object.keys(boardData).every((v: any) => boardData[v]);
        setIsDraw(check);
        if (check) setModalTitle('XO Draw!!!');
    };

    const checkWinner = (): void => {
        WINNING_COMBO.map((bd) => {
            const [a, b, c] = bd;
            if (boardData[a] && boardData[a] === boardData[b] && boardData[a] === boardData[c]) {
                setWon(true);
                setWonCombo([a, b, c]);
                setModalTitle(`Player ${!xTurn ? 'X' : 'O'} Won!!!`);
                return;
            }
        });
    };

    const reset = (): void => {
        setBoardData({
            0: '',
            1: '',
            2: '',
            3: '',
            4: '',
            5: '',
            6: '',
            7: '',
            8: ''
        });
        setXTurn(true);
        setWon(false);
        setWonCombo([]);
        setIsDraw(false);
        setModalTitle('');
    };

    return (
    // <Boxes width={70} height={70} strokeWidth={1.2}/> 
        <div className="">
            <div className="font-black text-center  text-5xl lg:text-7xl mt-28 text-zinc-100 flex items-center justify-center gap-x-5">Tic Tac Toe</div>
            <div className="flex flex-col items-center">
                <div className="text-center text-5xl lg:text-7xl font-black mt-10 mb-10 text-zinc-100">
                    <p>{xTurn ? 'X' : 'O'}</p>
                </div>

                <div className="grid grid-cols-3 gap-1 ">
                    {[...Array(9)].map((v, idx) => {
                        return (
                            <div
                                onClick={() => {
                                    updateBoardData(idx);
                                }}
                                key={idx}
                                className={`button-30 w-[100px] h-[100px] font-bold text-4xl z-10 ${
                                    wonCombo.includes(idx) ? 'bg-zinc-300 shadow-none' : 'bg-zinc-100'
                                }`}
                            >
                                {boardData[idx]}
                            </div>
                        );
                    })}
                </div>
            </div>

            <div
                className={`w-[250px] flex flex-col items-center fixed bg-white -translate-x-2/4 -translate-y-2/4 transition-transform p-6 rounded-2xl scale-0 left-2/4 top-2/4 z-20 ${
                    modalTitle ? '-translate-x-2/4 -translate-y-2/4 scale-100' : ''
                }`}
            >
                <div className=" text-lg font-bold mb-4 ">{modalTitle}</div>
                <button className="w-full h-9 text-lg text-zinc-100 font-md border-none rounded-sm  bg-black" onClick={reset}>
                    New Game
                </button>
            </div>
        </div>
    );
};

export default HomeComponent;
