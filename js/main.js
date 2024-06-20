const board = document.getElementById("board");
const rows = 6;
const cols = 6;
const totalTiles = rows * cols;
let numMines;

const tileValues = {};

function generateMines() {
    const minePositions = [];
    while (minePositions.length < numMines) {
        const position = Math.floor(Math.random() * totalTiles);
        if (!minePositions.includes(position)) {
            minePositions.push(position);
            tileValues[position] = "M";
        }
    }

    for (let i = 0; i < totalTiles; i++) {
        if (!tileValues[i]) {
            tileValues[i] = "D";
        }
    }
}

for (let i = 0; i < totalTiles; i++) {
    const tile = document.createElement("div");
    tile.classList.add("tile");
    tile.dataset.index = i;
    tile.addEventListener("click", () => revealTile(tile));
    board.appendChild(tile);
}

function revealTile(tile) {
    if (!tile.classList.contains("flipped")) {
        const index = parseInt(tile.dataset.index);
        const value = tileValues[index];
        tile.dataset.value = value;
        tile.classList.add("flipped");

        if (value === "M") {
            revealAllTiles();
        }
    }
}

function revealAllTiles() {
    const tiles = document.querySelectorAll(".tile");
    tiles.forEach(tile => {
        const index = parseInt(tile.dataset.index);
        const value = tileValues[index];
        tile.dataset.value = value;
        tile.classList.add("flipped");
    });
}
function setMinesCount(count) {
    numMines = count;
    generateMines();
}