const fs = require('fs')

function readFileReturnArray() {
    try {
        const data = fs.readFileSync('data/day2.txt', 'utf8')
        var array = data.toString().split("\n").map(item => item.trim());

        return array
    } catch (err) {
        console.error(err)
    }
}

function getPosition() {
    var positionArray = readFileReturnArray();

    var horizontalPosition = 0;
    var depth = 0;

    for (p = 0; p < positionArray.length; p++) {
        var splitArray = positionArray[p].toString().split(" ");

        if (splitArray[0] == 'forward') {
            horizontalPosition += Number(splitArray[1]);
        } else if (splitArray[0] == 'down') {
            depth += Number(splitArray[1]);
        } else if (splitArray[0] == 'up') {
            depth -= Number(splitArray[1]);
        }
    }

    return {horizontalPosition, depth};
}

function getPositionWithAim() {
    var positionArray = readFileReturnArray();

    var horizontalPosition = 0;
    var depth = 0;
    var aim = 0;

    for (p = 0; p < positionArray.length; p++) {
        var splitArray = positionArray[p].toString().split(" ");

        if (splitArray[0] == 'forward') {
            horizontalPosition += Number(splitArray[1]);
            depth += aim * Number(splitArray[1]);
        } else if (splitArray[0] == 'down') {
            aim += Number(splitArray[1]);
        } else if (splitArray[0] == 'up') {
            aim -= Number(splitArray[1]);
        }
    }

    return {horizontalPosition, depth};
}

var position = getPosition();
console.log('Part 1 - The horizontal position is: ' + position.horizontalPosition + ', the depth is: ' + position.depth);
console.log('Part 1 - The multiplication of horizontal position * depth is: ' + (position.horizontalPosition * position.depth));

var positionWithAim = getPositionWithAim();
console.log('Part 2 - The horizontal position is: ' + positionWithAim.horizontalPosition + ', the depth is: ' + positionWithAim.depth);
console.log('Part 2 - The multiplication of horizontal position * depth is: ' + (positionWithAim.horizontalPosition * positionWithAim.depth));