const { on } = require('events');
const fs = require('fs')

function readFileReturnArray() {
    try {
        const data = fs.readFileSync('data/day3.txt', 'utf8')
        var array = data.toString().split("\n").map(item => item.trim());

        return array
    } catch (err) {
        console.error(err)
    }
}

function getZeroAndOneCounts(binaryArray) {
    var zeroCount = [];
    var oneCount = [];

    for (b = 0; b < binaryArray.length; b++) {
        var splitArray = binaryArray[b].toString().split("");

        for (r = 0; r < splitArray.length; r++) {
            if (zeroCount[r] === undefined) {
                zeroCount.splice(r,0,0);
            }

            if (oneCount[r] === undefined) {
                oneCount.splice(r,0,0);
            }
            
            if (splitArray[r] == '0') {
                zeroCount[r]++;
            } else if (splitArray[r] == '1') {
                oneCount[r]++;
            }
        }
    }

    return {zeroCount, oneCount};
}

function getGammaRateEpsilonRate() {
    var binaryArray = readFileReturnArray();
    var counts = getZeroAndOneCounts(binaryArray);

    var zeroCount = counts.zeroCount;
    var oneCount = counts.oneCount;

    var gammaRate = '';
    var epsilonRate = '';

    for (i = 0; i < Math.min(zeroCount.length, oneCount.length); i++) {
        if (zeroCount[i] > oneCount[i]) {
            gammaRate += '0';
            epsilonRate += '1';
        } else if (zeroCount[i] < oneCount[i]) {
            gammaRate += '1';
            epsilonRate += '0';
        }
    }

    return {gammaRate, epsilonRate};
}

function getPowerConsumption() {
    var powerConsumption = 0;

    var rates = getGammaRateEpsilonRate();

    var gammaDecimal = parseInt(rates.gammaRate, 2);
    var epsilonDecimal = parseInt(rates.epsilonRate, 2);

    powerConsumption = gammaDecimal * epsilonDecimal;

    return powerConsumption;
}

function getOxygenGeneratorRating() {
    var binaryArray = readFileReturnArray();

    var counts = getZeroAndOneCounts(binaryArray);
    var zeroCount = counts.zeroCount;
    var oneCount = counts.oneCount;

    var filterArray = binaryArray;

    for (i = 0; i < Math.min(zeroCount.length, oneCount.length); i++) {
        var newCounts = getZeroAndOneCounts(filterArray);

        newZeroCount = newCounts.zeroCount;
        newOneCount = newCounts.oneCount;

        if (newZeroCount[i] > newOneCount[i]) {
            filterArray = filterArray.filter(item => item[i] == '0');
        } else if (newZeroCount[i] < newOneCount[i]) {
            filterArray = filterArray.filter(item => item[i] == '1');
        } else if (newZeroCount[i] == newOneCount[i]) {
            filterArray = filterArray.filter(item => item[i] == '1');
        }

        if (filterArray.length == 1) { break; }
    }

    return filterArray;
}

function getCO2ScrubberRating() {
    var binaryArray = readFileReturnArray();

    var counts = getZeroAndOneCounts(binaryArray);
    var zeroCount = counts.zeroCount;
    var oneCount = counts.oneCount;

    var filterArray = binaryArray;

    for (i = 0; i < Math.min(zeroCount.length, oneCount.length); i++) {
        var newCounts = getZeroAndOneCounts(filterArray);

        newZeroCount = newCounts.zeroCount;
        newOneCount = newCounts.oneCount;

        if (newZeroCount[i] > newOneCount[i]) {
            filterArray = filterArray.filter(item => item[i] == '1');
        } else if (newZeroCount[i] < newOneCount[i]) {
            filterArray = filterArray.filter(item => item[i] == '0');
        } else if (newZeroCount[i] == newOneCount[i]) {
            filterArray = filterArray.filter(item => item[i] == '0');
        }

        if (filterArray.length == 1) { break; }

        // console.log(filterArray);
    }

    return filterArray;
}

function getLifeSupportRating() {
    var lifeSupportRating = 0;

    var oxygenGeneratorRating = getOxygenGeneratorRating();
    var co2ScrubberRating = getCO2ScrubberRating();

    var oxygenGeneratorDecimal = parseInt(oxygenGeneratorRating[0], 2);
    var co2ScrubberDecimal = parseInt(co2ScrubberRating[0], 2);

    lifeSupportRating = oxygenGeneratorDecimal * co2ScrubberDecimal;

    return lifeSupportRating;
}

console.log('Part 1 - The power consumption of the submarine is: ' + getPowerConsumption());
console.log('Part 2 - The life support rating of the submarine is: ' + getLifeSupportRating());