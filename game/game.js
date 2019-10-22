

// sarah's function that we will use for the for loop 
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