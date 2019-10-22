const giveBoardNumAdjMines = (boardArray, minesArray) => {


    const minesArrayRow = minesArray[0]; 
    const minesArrayColumn = minesArray[1]; 

    

    for (let i= -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {

            const itIsMine = (i === 0 && j === 0);
            const 

            
            if (i !== 0 && j !== 0) {
                boardArray[minesArrayRow + i][minesArrayColumn + j].numAdjMines++; 
            }
        }
    }
};


