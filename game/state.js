const state = {
    numRows: 8, 
    numColumns: 8, 
    numMines: 10, 
    userHasFlag: false, 
    firstClick: true,

    initializeFlagsRemaining() {
        this.flagsRemaining = this.numMines;
    }
};

export default state;
