
/*****************************************************************************
 * Board size variables
 *****************************************************************************/
var gameGridCellSize;

/*****************************************************************************
 * Redraw buttons
 *****************************************************************************/
function uiButtonsRedraw(game) {
    if (game.moveHistory.length == 0) {
        elements.buttonUndo.disabled = true;
    } else {
        elements.buttonUndo.disabled = false;
    }

    if (game.level == 0 && game.moveHistory.length == 0) {
        elements.buttonRestart.disabled = true;
    } else {
        elements.buttonRestart.disabled = false;
    }
}

/*****************************************************************************
 * Redraw level elements
 *****************************************************************************/
function uiInfoRedraw(game) {
    let gameInfo = document.getElementById("game-info");
    gameInfo.innerHTML = "L" + (game.level + 1) + "/" + gameChallenges.length;
}

/*****************************************************************************
 * Redraw cell
 *****************************************************************************/
function uiCellRedraw(board, x, y) {
    /* Get DOM element for counter */
    let cell = document.getElementById("cell-" + x + "-" + y);

    /* Set value on board */
    cell.innerHTML = board.values[x][y];

    /* Set background */
    if (board.resolved(x, y)) {
        cell.style.background = "#67BFEC";
    } else {
        cell.style.background = "none";
    }

}


function uiElementsRedraw(board) {
    var canvas = document.getElementById('game-canvas');
    var context = canvas.getContext('2d');

    /* Set canvas size and clear it */
    const pixelRation = 2.0;
    canvas.width = elements.grid.clientWidth * pixelRation;
    canvas.height = elements.grid.clientHeight * pixelRation;
    context.scale(pixelRation, pixelRation);
    context.clearRect(0, 0, canvas.width, canvas.height);

    /* Draw dots */
    var dotRadius = 3;
    for (y = 0; y <= board.height; y++) {
        for (x = 0; x <= board.width; x++) {
            context.beginPath();
            context.arc(gameGridCellSize * x, gameGridCellSize * y, dotRadius, 0, 2 * Math.PI, false);
            context.fillStyle = "#202020";
            context.fill();
        }
    }

    /* Draw walls */
    var lineWidth = 3;
    context.beginPath();
    context.lineWidth = lineWidth;
    context.strokeStyle = "#202020";

    /* Draw vertical walls */
    for (let x = 0; x < board.width + 1; x++) {
        for (let y = 0; y < board.height; y++) {
            if (board.getVerticalWall(x, y) > 0) {
                context.moveTo(gameGridCellSize * x, gameGridCellSize * y);
                context.lineTo(gameGridCellSize * x, gameGridCellSize * (y + 1));
            }
        }
    }

    /* Draw horizontal walls */
    for (let y = 0; y < board.height + 1; y++) {
        for (let x = 0; x < board.width; x++) {
            if (board.getHorizontalWall(x, y) > 0) {
                context.moveTo(gameGridCellSize * x, gameGridCellSize * y);
                context.lineTo(gameGridCellSize * (x + 1), gameGridCellSize * y);
            }
        }
    }

    context.stroke();
}

function uiBoardRedraw(board) {
    /* Redraw cell content */
    for (y = 0; y < board.height; y++) {
        for (x = 0; x < board.width; x++) {
            /* Redraw item image */
            uiCellRedraw(board, x ,y);
        }
    }

    /* Redraw dots and walls */
    uiElementsRedraw(board);

    /* Redraw info */
    uiInfoRedraw(globals.game);

    /* Redraw buttons */
    uiButtonsRedraw(globals.game);
}


/*****************************************************************************
 * Setup board elements
 *****************************************************************************/
function uiBoardSetup(board) {

    /* Calculate board grid size */
    gameGridCellSize = Math.floor((elements.screen.clientWidth) / 9); /* 9 = Maximum board X-size */

    /* Clear elements in board */
    while (elements.grid.firstChild) {
        elements.grid.removeChild(elements.grid.firstChild);
    }

    /* Center the board */
    elements.board.style.width = gameGridCellSize * board.width + "px";
    elements.board.style.left  = Math.floor((gameGridCellSize * (9 - board.width)) / 2) + "px";

    /* Create grid and add cells */
    for (y = 0; y < board.height; y++) {
        /* Create row */
        let newRow = document.createElement("div");
        newRow.className = "grid-row";
        elements.grid.appendChild(newRow);

        for (x = 0; x < board.width; x++) {
            /* Create cell */
            let newCell = document.createElement("div");
            newCell.className    = "grid-cell";
            newCell.id           = "cell-" + x + "-" + y;

            newCell.style.width      = gameGridCellSize + "px";
            newCell.style.height     = gameGridCellSize + "px";
            newCell.style.lineHeight = gameGridCellSize + "px"; /* Center text vertically */
            newCell.style.textAlign  = "center";

            newRow.appendChild(newCell);

        }
    }

    /* Redraw board */
    uiBoardRedraw(board);
}

/*****************************************************************************
 * Refresh board elements and check if game over
 *****************************************************************************/
function uiGridAnimationEnd(event) {
    event.stopPropagation();

    if (globals.game.level + 1 >= gameChallenges.length) {
        /* Show game over modal */
        gameOverModal.style.visibility = "visible";
        elements.board.style.visibility = "hidden";
    }

    gameStart(globals.game.level + 1); /* Start new level */
    return false;
}

function uiGameRefresh(game) {
    /* Redraw game board */
    uiBoardRedraw(globals.game.board);

    /* Check if end of level */
    if (globals.game.board.solved()) {
        /* Start animation */
        elements.board.addEventListener("animationend", uiGridAnimationEnd);
        elements.board.style.animation = "none";
        elements.board.offsetHeight; /* trigger reflow */
        elements.board.style.animation = "image-appear 0.5s ease-in 0.2s 1 reverse";
    }
}




//document.getElementById("debug-text").innerHTML = window.innerWidth;

