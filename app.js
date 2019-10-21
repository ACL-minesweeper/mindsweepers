const mainContainer = document.getElementById('main-container');


const createCell = (id) => {
    const newDiv = document.createElement('div');
    newDiv.id = id;
    newDiv.textContent = 'cell';
    mainContainer.appendChild(newDiv);
    newDiv.addEventListener('click', () => {
        alert('you clicked here!');
        return mainContainer;
    });
};

createCell('00');
createCell('01');
createCell('02');
createCell('10');
createCell('11');
createCell('12');
createCell('20');
createCell('21');
createCell('22');

//forLoop (id, numOfCellsWanted)


