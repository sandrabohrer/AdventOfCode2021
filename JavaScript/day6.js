const fs = require('fs');

function readFileReturnArray() {
    try {
        const data = fs.readFileSync('data/day6.txt', 'utf8');
        var array = data.toString().split(",").map(item => item.trim());
        array = array.map(Number);

        return array;
    } catch (err) {
        console.error(err);
    }
}

function getLanternfish(days) {
    var lanternfishArray = readFileReturnArray();

    var day = 0;

    while(day != days) {
        for (f = 0; f < lanternfishArray.length; f++) {
            if (lanternfishArray[f] == 0) {
                lanternfishArray.splice(f, 1, 6);
                lanternfishArray.push(9);
            } else {
                lanternfishArray.splice(f, 1, lanternfishArray[f]-1);
            }
        }

        day++;
    }

    var numberOfFish = lanternfishArray.length;

    return numberOfFish;
}

// console.log('The number of fish after 80 days is ' + getLanternfish(80));
// console.log('The number of fish after 256 days is ' + getLanternfish());
console.log(getLanternfish(256));
// getLanternfish();