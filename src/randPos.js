import map from '../assets/map/map.js'
import {randInt, textToPos, posToText} from './utils.js'
import {shrines, state} from './store.js'


export function randomizePresencePositions(player_pos) {
    let possible_pos = {}
    var array_pos = []

    // No presence arrived yet
    for (let p in state.presences) state.presences[p].arrived = false

    // copy all map positions
    for (let k in map) possible_pos[k] = true

    // remove positions too close to player position
    deleteCube(possible_pos, player_pos, 1)

    // remove positions too close to shrines
    for (let k in shrines) {
        deleteCube(possible_pos, shrines[k].position, 2)
    }

    // place the dark presence
    if (state.level == 2) {
        array_pos = Object.keys(possible_pos)
        state.darkPresence.position = textToPos(array_pos[randInt(array_pos.length)])
    } else {
        state.darkPresence.position = [100,100,100]
    }

    // place presences
    // Placing presences may fail for when one is placed, the others
    // have less space to be placed. Try again sometimes if failed.
    var failed = false
    var remainingAttempts = 10
    do {
        let remaining_pos = Object.assign({}, possible_pos)
        for (let k in shrines) {
            // convert to array so can random pick an index
            array_pos = Object.keys(remaining_pos)
            // check if still has positions to use
            if (!array_pos.length) {
                // no positions left, try again?
                failed = true
                console.log('ops...')
            } else {
                // random choice
                var pos = textToPos(array_pos[randInt(array_pos.length)])
                // set presence to pos
                state.presences[k].position = pos
                // remove positions too close to presence
                deleteCube(remaining_pos, pos, 2)
            }
        }
        remainingAttempts--
    } while (failed && remainingAttempts)

    if (failed) {
        console.log('OMG! I failed! =O')
    }
}

function deleteCube(obj, center, radius) {
    var [xc, yc, zc] = center
    for (let i=xc-radius; xc+radius>=i; i++) {
        for (let j=yc-radius; yc+radius>=j; j++) {
            for (let k=zc-radius; zc+radius>=k; k++) {
                delete obj[posToText([i, j, k])]
            }
        }
    }
}
