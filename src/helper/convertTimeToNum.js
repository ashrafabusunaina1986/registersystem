
export var ConvertTimeToNum = time => {
    var strTime = String( time)
    var partialTime = strTime.split(':')
    let numTime = 0
    if (partialTime.length === 3) numTime += partialTime[0] * 60 * 60 + partialTime[1] * 60 + partialTime[2]
    else if (partialTime.length === 2) numTime += partialTime[0] * 60 * 60 + partialTime[1] * 60

    return numTime


}

