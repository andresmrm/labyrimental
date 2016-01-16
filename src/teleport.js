// var teleports = {
//     '2_7_0' : ['n', 'o', ''],
//     '4_7_0' : ['n', 'o', ''],
//     '5_7_0' : ['n', 'l', '4_4_0'],
//     '1_11_0': ['l', 's', '4_4_0'],
//     '3_12_0': ['l', 'n', ''],
//     '7_12_0': ['o', 'n', '4_4_0'],

//     '4_4_0' : ['o', 's'],
// }


// // Calculate the difference between 2 directions
// function rotDiff(d1, d2) {
//     return directions.indexOf(d1) - directions.indexOf(d2)
// }


// Calculate if a teleport is a left or a right one
// function calcRotKind(to, from) {
//     // 1 e -3 = l
//     // 0 e -4

//     // 3 e -1 = r
//     // 2 e -2
//     if ((rotDiff(to, from) - 1) % 4) return 'right'
//     else return 'left'
// }

// function checkTeleportation(state) {
//     var curr = posToText(state.position)
//     var teleFrom = teleports[curr]

//     if (teleFrom
//         && teleFrom[2]
//         && teleFrom[0] != state.direction
//         && teleFrom[0] != rot180(state.direction)) {

//         // var teleToKey = null
//         // if (state.position[0] != 1) teleToKey = '1_11'
//         // else teleToKey = '2_7'
//         // var teleTo = teleports[teleToKey]
//         // // console.log(textToPos(teleToKey))
//         var teleTo = teleports[teleFrom[2]]
//         state.position = textToPos(teleFrom[2])
//         teleTo[2] = curr
//         console.log(teleFrom[2], teleTo)


//         var diff = rotDiff(teleFrom[1], teleTo[0])
//         // console.log(teleFrom[1], teleTo[0], diff)
//         if (diff < 0) diff += 4
//         for (let i = diff; i > 0; i--) {
//             console.log('Rooot!!', state.position)
//             state.direction = rotLeft(state.direction)
//         }
//     }
// }
