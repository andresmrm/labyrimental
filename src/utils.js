var directions = ['n', 'e', 's', 'w']

// Return a random int from 0 to x-1
export function randInt(x) {
    return Math.floor(Math.random() * (x))
}

// Check if two arrays have the same numbers in the same order
export function equalArrays(a1, a2) {
    var equal = true
    for (let i in a1) {
        if (a1[i] != a2[i]) {
            equal = false
            break
        }
    }
    return equal
}

// Converts a text to a position. e.g.: '2_4_5' -> [2,4,5]
export function textToPos(t) {
    return t.split('_').map((x)=>parseInt(x))
}

// Converts a position to text. e.g.: [2,4,5] -> '2_4_5'
export function posToText(pos) {
    return pos.join('_')
}

// Converts a position and a direction to text. e.g.: [2,4,5], 'n' -> '2_4_5_n'
export function posDirToText(pos, direction) {
    return posToText(pos) + '_' + direction
}

// Returns eclidean distance between 2 positions
export function posDist(p1, p2) {
    return Math.sqrt(Math.pow(p1[0] - p2[0], 2) +
                     Math.pow(p1[1] - p2[1], 2) +
                     Math.pow(p1[2] - p2[2], 2))
}

// Returns a rotated direction to the left
export function rotLeft(dir) {
    if (dir == 'n') return 'w'
    else return directions[directions.indexOf(dir) - 1]
}

// Returns a rotated direction to the right
export function rotRight(dir) {
    if (dir == 'w') return 'n'
    else return directions[directions.indexOf(dir) + 1]
}

// Returns the oposite direction
export function rot180(dir) {
    return rotLeft(rotLeft(dir))
}

export function getBounds(obj) {
    return [obj.x, obj.y, obj.width, obj.height]
}
