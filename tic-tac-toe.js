let nowPlaying = 1;
let boardArray;
let winCondition = 3;
let results;
function mark(box) {
    box.innerHTML = nowPlaying == 1 ? "X" : "O";
    box.setAttribute("inside", nowPlaying == 1 ? "X" : "O");
    box.removeAttribute("onclick");
    nowPlaying = nowPlaying == 1 ? 2 : 1;
    boardArray[box.getAttribute("row")][box.getAttribute("col")] = box.innerHTML;
    let allResults = [WinCheckHorizontal(), WinCheckVertical(), WinCheckDiagonal(), WinCheckDiagonal2()];
    let winMethod = { 1: "horizontal", 2: "vertical", 3: "diagonal", 4: "diagonal2" };
    for (let i = 0; i < allResults.length; i++) {
        if (allResults[i] != undefined) {
            allResults[i].push(winMethod[i + 1]);
            results = allResults[i];
            break;
        }
    }
    if (results != undefined) {
        const winner = results[0];
        alert((winner == "X" ? "Player 1" : "Player 2") + " wins! ");
        const winningBoxesLocation = results[1];
        winningBoxes = [];
        winningBoxesLocation.forEach(coords => {
            const item = document.querySelector(`[row="${coords[0]}"][col="${coords[1]}"]`)
            winningBoxes.push(item);
            item.setAttribute("win", results[2]);

        });
        // winningBoxes.forEach(box => {
        //     box.setAttribute("win", results[2]);
        // });
        results = undefined;
        document.querySelectorAll(".box").forEach(box => {
            box.removeAttribute("onclick");
        });
    }
}
function openFullscreen(elem) {
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
        elem.msRequestFullscreen();
    }
}
function StartGame() {
    if (document.getElementById('fullscreen-inp').checked) {
        openFullscreen(document.querySelector(".game-container"));
    }
    ShowHideGui('hide');
    boardSizeInp = document.getElementById('board-size');
    boardSize = boardSizeInp.value;
    if (boardSize < 3) {
        boardSize = 3;
        boardSizeInp.value = 3;
    }
    else if (boardSize > 20) {
        boardSize = 20;
        boardSizeInp.value = 20;
    }
    boardArray = createBoardList(boardSize);
    // --------------------
    winConditionInp = document.getElementById('win-condition');
    winCondition = document.getElementById('win-condition').value - 1;
    if (winCondition > boardArray.length - 1) {
        winCondition = boardArray.length - 1;
        winConditionInp.value = winCondition + 1;
    } else if (winCondition < 2) {
        winCondition = 2;
        winConditionInp.value = winCondition + 1;
    } else if (winCondition > 7) {
        winCondition = 7;
        winConditionInp.value = winCondition + 1;
    }
    createBoardElement(boardArray);
}
function createBoardList(size) {
    let board = [];
    for (var row = 0; row < size; row++) {
        board[row] = [];
        for (var col = 0; col < size; col++) {
            board[row][col] = "-";
        }
    }
    return board;
}
function createBoardElement(boardArray) {
    const boardElement = document.getElementById("board");
    while (boardElement.firstChild) {
        boardElement.removeChild(boardElement.lastChild);
    }
    boardElement.style.gridTemplate = `repeat(${boardArray.length}, 1fr) / repeat(${boardArray.length}, 1fr)`;
    for (let column = 0; column < boardArray.length; column++) {
        const element = boardArray[column];
        for (let row = 0; row < element.length; row++) {
            const boxElement = document.createElement("div");
            if (boardArray.length > 10) {
                boxElement.className = "box";
            } else {
                boxElement.className = "box box-big";
            }
            const element = boardArray[column][row];
            boxElement.setAttribute("row", column);
            boxElement.setAttribute("col", row);
            boxElement.setAttribute("onclick", "mark(this)");
            boardElement.appendChild(boxElement);
        }

    }
}
function WinCheckHorizontal() {
    for (let rowNum = 0; rowNum < boardArray.length; rowNum++) {
        const row = boardArray[rowNum];
        let lastItem;
        let count = 0;
        for (let colNum = 0; colNum < row.length; colNum++) {
            const col = row[colNum];
            if (lastItem != "-" && col == lastItem) {
                count++;
                if (count == winCondition) {
                    winningBoxes = [];
                    for (let i = 0; i < count + 1; i++) {
                        winningBoxes.push([rowNum, colNum - i]);
                    }
                    return [lastItem, winningBoxes];
                }
            } else { count = 0; }
            lastItem = col;
        }
    }
}
function WinCheckVertical() {
    for (let col = 0; col < boardArray.length; col++) {
        let lastItem;
        let count = 0;
        for (let row = 0; row < boardArray.length; row++) {
            const item = boardArray[row][col];
            if (lastItem != "-" && item == lastItem) {
                count++;
                if (count == winCondition) {
                    winningBoxes = [];
                    for (let i = 0; i < count + 1; i++) {
                        winningBoxes.push([row - i, col]);
                    }
                    return [lastItem, winningBoxes];
                }
            } else { count = 0; }
            lastItem = item;
        }
    }
}
function WinCheckDiagonal() {
    for (let row = (-boardArray.length + 1 + winCondition); row < boardArray.length - winCondition; row++) {
        let lastItem;
        let count = 0;
        for (let index = 0; index < boardArray.length; index++) {
            if ((index - row) < 0 || (index - row) > boardArray.length - 1) { continue; }
            const item = boardArray[index][index - row];
            if (lastItem != "-" && item == lastItem) {
                count++;
                if (count == winCondition) {
                    winningBoxes = [];
                    for (let i = 0; i < count + 1; i++) {
                        winningBoxes.push([index - i, (index - row) - i]);
                    }
                    return [lastItem, winningBoxes];
                }
            } else { count = 0; }
            lastItem = item;
        }
    }
}
function WinCheckDiagonal2() {
    for (let row = winCondition; row < boardArray.length + 1 + winCondition; row++) {
        let lastItem;
        let count = 0;
        for (let index = 0; index < boardArray.length; index++) {
            if ((row - index) < 0 || (row - index) > boardArray.length - 1) { break; }
            const item = boardArray[index][row - index];
            // console.log("row: ", row, "index: ", index, "item: ", item, "lastItem: ", lastItem, "count: ", count);
            if (lastItem != "-" && item == lastItem) {
                count++;
                if (count == winCondition) {
                    winningBoxes = [];
                    for (let i = 0; i < count + 1; i++) {
                        winningBoxes.push([index - i, (row - index) + i]);
                    }
                    // console.log("Diagonal win detected with winningBoxes: ", winningBoxes);
                    return [lastItem, winningBoxes];
                }
            } else { count = 0; }
            lastItem = item;
        }
    }
    // console.log("No diagonal win detected");
    return null;
}

function AnnounceWinner() {
    const winner = WinCheckHorizontal();
    if (winner != 0) {
        alert(winner + " wins!");
    }
}


