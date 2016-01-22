import map from '../assets/map/map.js'
import {randInt, posToText, posDist, getBounds, rotLeft, rotRight, rot180} from './utils.js'
import {setListenerPos, setAudioOri, setPannerPos} from './audio.js'
import {loadVision} from './vision.js'
import {state} from './store.js'


var walk = {
    e: [1, 0, 0],
    s: [0, -1, 0],
    w: [-1, 0, 0],
    n: [0, 1, 0],
}


function tryChangePos(direction) {
    let newPos = map[posToText(state.position)][direction]
    if (newPos) {
        var oldPos = state.position
        state.position = newPos
        var posSetter = (pos) => setListenerPos(state.game.sound.context, pos)
        tweenPos(oldPos, newPos, posSetter, 500, state, 'Move')
        state.game.createdSounds.steps.play(randInt(5))
        return true
    }
    return false
}

export function changeDarkPresencePos(playerPos, fTouched) {
    var oldPos = state.darkPresence.position
    var posSetter = (pos) => {
        if (state.state == 'playing') {
            setPannerPos(state.darkPresence.sound.panner, pos)
            state.darkPresence.position = pos
            // state.effect2.x = pos[0] * 50
            // state.effect2.y = pos[1] * 50
            if (posDist(pos, state.position) < 0.5 && fTouched) fTouched()
        }
    }
    var time = posDist(oldPos, playerPos) * 3500
    tweenPos(oldPos, playerPos, posSetter, time, state.darkPresence)
}

export function move(event, key) {
    if (state.state == 'playing' && !state.loadingVision
        /*&& noRecentMove(state, 1000)*/) {
        var moved = false
        var rotated = false
        switch (key) {
        case 'UP':
            moved = tryChangePos(state.direction)
            break
        case 'DOWN':
            moved = tryChangePos(rot180(state.direction))
            break
        case 'LEFT':
            rotatePlayer(state, 'left')
            rotated = true
            break
        case 'RIGHT':
            rotatePlayer(state, 'right')
            rotated = true
            break
        }
        // checkTeleportation(state)
        if (rotated || moved) loadVision(state)
        if (moved && state.onMoved) state.onMoved()
    }
}

function rotatePlayer(state, type) {
    var oldPos = walk[state.direction]
    if (type == 'left') state.direction = rotLeft(state.direction)
    else state.direction = rotRight(state.direction)
    var newPos = walk[state.direction]
    var posSetter = (pos) => setAudioOri(state.game.sound.context, pos)
    tweenPos(oldPos, newPos, posSetter, 500, state, 'Rotate')
}

export function changePresencePos(presence, newPos, time) {
    var oldPos = presence.position
    presence.position = newPos
    var posSetter = (pos) => setPannerPos(presence.sound.panner, pos)
    tweenPos(oldPos, newPos, posSetter, time, presence)
}

// Tween a position running posSetter on each interaction.
// Store tween in 'store', use 'tween'+extraName to name the pointer.
export function tweenPos(oldPos, newPos, posSetter, time, store, extraName) {
    var [ox, oy, oz] = oldPos
    var [nx, ny, nz] = newPos
    var obj = {x:ox, y:oy, z:oz}
    var tweenTo = state.game.add.tween(obj).to({x:nx, y:ny, z:nz}, time, "Linear")
    var updateFunc = () => posSetter([obj.x, obj.y, obj.z])
    tweenTo.onUpdateCallback(updateFunc)
    tweenTo.onComplete.add(updateFunc)
    tweenTo.start()
    // Remove old tween, save pointer to new tween
    if (store) {
        var name = 'tween'
        if (extraName) name += extraName
        if (store[name]) store[name].stop()
        store[name] = tweenTo
    }
}

export function initPlayerPos() {
    setListenerPos(state.game.sound.context, state.position)
    setAudioOri(state.game.sound.context, walk[state.direction])
}

// function noRecentMove(state, time) {
//     var currTime = new Date().getTime()
//     if (state.lastMoveTime) {
//         if (Math.abs(currTime - state.lastMoveTime) < time) return false
//     }
//     state.lastMoveTime = currTime
//     return true
// }
