/**
 * @description Selects the color input so that we can retrieve the colour
   value needed to colour the cells
*/
const color = document.getElementById('colorPicker');
/**
 * @description Used to toggle the cells colour (if it had a colour and the
   user clicks it again, it goes back to white)
*/
const white = 'rgb(255, 255, 255)';

/**
 * @description Selects the form so that we can set the constants for the
   number of rows and number of columns required
*/
const gridForm = document.getElementById('sizePicker');

/**
 * @description Selects the table so that we can create the rows and cells
   as requested by the user
*/
const table = document.getElementById('pixelCanvas');

/**
 * @description Creates the body of the table as well as the rows and cells
   chosen by the user in the "sizePicker" form then appends these to the
   table
 * @param {integer} rows - number of rows to be created
 * @param {integer} columns - number of cells to be created
*/

function makeGrid(rows,columns) {
    const createTableBody = document.createElement('tbody');

    for (let x = 0; x < rows; x++) {
        const createTableRow = document.createElement('tr');
        for (let y = 0; y < columns; y++) {
            const createTableColumn = document.createElement('td');
            createTableRow.appendChild(createTableColumn);
        }

        createTableBody.appendChild(createTableRow);
    }

    table.appendChild(createTableBody);
}

/**
 * @description Sets the constants for number of rows and number of cells
   requested by the user. Only allows for a minimum of 3 rows and 3 cells
   per row as well as a maxinum of 20 rows and 60 cells per row so that
   there is a decent size grid that is neither too big or too small to
   create coloured squares. If selection is not within these boundaries,
   a message is displayed to the user forcing them to change the selection
   until such time as it falls within the allowable range. Once an
   acceptable selection has been made, we call the makeGrid function.
*/
function pressedSubmit(event){
    const rows = gridForm.inputHeight.value;
    const columns = gridForm.inputWidth.value;
    if ((rows <= 2 || rows > 20) || (columns <= 2 || columns > 60)) {
        alert('Please enter Grid Rows greater than 2 and maximum 20 ' +
        ' as well as Grid Columns greater than 2 and maximum 60');
    } else{
        makeGrid(rows,columns);
    }
}

/**
 * @description Listens for the submit button to be pressed then removes
   all of the rows and columns from the table that were previously
   generated (if applicable) so that they are not added to the bottom of
   the table. This in turn also clears all the colour from the grid that may
   have previously been setup
*/
gridForm.addEventListener('submit',function(el){
    el.preventDefault();

    while (table.firstChild){
        table.removeChild(table.firstChild);
    }
    pressedSubmit(el);
});

/**
 * @description If the user clicked on a cell (not a border or the table
   itself), we first check that the colour is not white. If it is white,
   we display an alert to the user to ask them to choose anything other
   than white (white would have no effect). This will be displayed until
   the user selects a different colour. We then setup the constant to
   determine the current colour that the cell has. If the current colour is
   white or blank, we colour the cell to the selected cell in the colour
   picker, otherwise if the current colour is a colour other than white, we
   change it to white (toggling the colours)
*/
function colorTheCell(evt) {
    if (evt.target.nodeName === 'TD') {
        const chosenColour = document.getElementById('colorPicker').value;
        while (chosenColour === '#ffffff') {
            alert('Please choose a different color to white');
            break;
        }

        const currentColor = evt.target.style.backgroundColor;

        if (currentColor === white || currentColor === ''){
            evt.target.style.backgroundColor = chosenColour;
        } else {
            evt.target.style.backgroundColor = white;
        }
    }
}

/**
 * @description Calls the colorTheCell function when a user clicks
   anywhere in the table. Within the function, we ensure that the user
   clicked a cell and not the table itself or a border.
*/
table.addEventListener('click', colorTheCell);
