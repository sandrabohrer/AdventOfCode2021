const fs = require('fs')

function readFileReturnArray() {
    try {
        const data = fs.readFileSync('data/day1.txt', 'utf8')
        var array = data.toString().split("\n").map(item => item.trim());
        array = array.map(Number)

        return array
    } catch (err) {
        console.error(err)
    }
}

function getDepthMeasurementIncreases() {
    var depthMeasurementArray = readFileReturnArray();

    var depthIncrease = 0;

    for (d = 1; d < depthMeasurementArray.length; d++) {
        if (depthMeasurementArray[d] > depthMeasurementArray[d-1]) {
            depthIncrease += 1;
        }
    }
  
    return depthIncrease
}

function getThreeMeasurementWindowIncreases() {
    var depthMeasurementArray = readFileReturnArray();

    var threeWindowSumIncrease = 0;

    for (d = 1; d < depthMeasurementArray.length-2; d++) {
        var firstThreeWindowSum = depthMeasurementArray[d-1] + depthMeasurementArray[d] + depthMeasurementArray[d+1];
        var secondThreeWindowSum = depthMeasurementArray[d] + depthMeasurementArray[d+1] + depthMeasurementArray[d+2];

        if (secondThreeWindowSum > firstThreeWindowSum) {
            threeWindowSumIncrease += 1;
        }
    }
  
    return threeWindowSumIncrease
}

console.log('The number of depth measurement increases is: ' + getDepthMeasurementIncreases());
console.log('The number of three-measurement sliding window increases is: ' + getThreeMeasurementWindowIncreases());