const fs = require('fs')

function readFileReturnArray() {
    try {
        const data = fs.readFileSync('data/day4.txt', 'utf8');
        var array = data.toString().split("\n").map(item => item.trim());

        return array;
    } catch (err) {
        console.error(err);
    }
}

function getBingoNumbersAndBoards() {
    var bingoArray = readFileReturnArray();

    var bingoNumbers = bingoArray[0];

    bingoArray.splice(0, 2);

    var bingoBoards = bingoArray.join("\n");

    var bingoBoardsArray = bingoBoards.toString().split("\n\n").map(item => item.trim());

    return {bingoNumbers, bingoBoardsArray};
}

getBingoNumbersAndBoards();