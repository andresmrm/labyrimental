import {equalArrays} from './utils.js'
import {changePresencePos} from './movement.js'
import {addEffect} from './vision.js'
import {shrines, state} from './store.js'
import {changePresenceSoundGain} from './createAudios.js'
import {checkTutorial, TUTORIAL_PHASES} from './tutorial.js'


export function playSong(name, fadeInTime=2000) {
    if (state.currentSong) state.currentSong.stop()
    state.currentSong = state.game.createdSounds[name]
    state.currentSong.fadeIn(fadeInTime, true, '')
}

export function stopSong(fadeOutTime=2000) {
    if (state.currentSong && state.currentSong.isPlaying)
        state.currentSong.fadeOut(fadeOutTime)
}


export function touchedDarkPresence() {
    if (state.followed.length == 4) state.won()
    else state.lost()
}

export function onSetVision(isResize) {

    // Make sure that the song won't play in game.
    if (state.state == 'playing') stopSong()

    // Effects
    if (['pregame', 'starting'].includes(state.state)) {
        addEffect(state, 0x000000, 1)
        if (state.state == 'starting') {
            state.state = 'playing'
            stopSong()
            state.game.add.tween(state.effect)
                .to({alpha: 0}, 2000, "Linear", true)
            if (!isResize) {
                if (state.level == 1) state.game.createdSounds.harpStart.play()
            }
        }
    }


    // var tweenBack = state.game.add.tween(effect).to( { alpha: 0 }, 1000, "Linear")
    // tweenTo.chain(tweenBack)
    // tweenTo.start()


    if (!isResize) {
        checkFollowPresence()
        checkInShrine()
    }
}

export function interact() {
    if (state.state == 'playing') {
        var presence = isInPresence(state.position)
        if (presence &&
            state.power.includes(presence) &&
            !state.presences[presence].arrived) {

            if (state.level == 2 || !state.followed.length) {
                // presence starts to follow player
                state.followed.push(presence)
                changePresenceSoundGain(presence, 0.25)
                state.game.createdSounds.magicRequest.play()
                if (state.level == 2) {
                    // Gain color!
                    state.tint += shrines[presence].color
                    if (state.filters.length) state.filters = []
                }

                // Open tutorial dialog if needed
                checkTutorial(TUTORIAL_PHASES.callingPresence, presence)

                return true
            }
        }
        state.game.createdSounds.magicNo.play()
    }

    return false
}

function checkFollowPresence() {
    // if (state.followed) {
    for (let p of state.followed) {
        changePresencePos(state.presences[p], state.position, 2000)
    }
    // }
}

// Check if is in a different shrine and set player power
function checkInShrine() {
    var shrine = isInShrine(state.position)
    if (shrine) {
        if (state.level == 1) {
            // If not followed and entering a shrine of different power
            // that still hasn't its presence
            if (!state.followed.length &&
                !state.presences[shrine].arrived) {
                var newPower = true
                if (state.power.length && state.power[0] == shrine) newPower = false
                if (newPower) {
                    if (state.power.length) {
                        // Changing current power
                        checkTutorial(TUTORIAL_PHASES.changedPower, shrine)
                    } else {
                        // First power
                        checkTutorial(TUTORIAL_PHASES.searchingShrine, shrine)
                    }
                    setPower(shrine, true)
                }


            // If followed by presence of the current shrine
            } else if (state.followed.includes(shrine)) {
                presenceArrived(state, shrine)

                // Open tutorial dialog if needed
                checkTutorial(TUTORIAL_PHASES.returningPresence, shrine)
            }
        } else {
            if (!state.power.includes(shrine)) setPower(shrine)
        }
    }
}

function presenceArrived(state, presence) {
    state.presences[presence].arrived = true
    changePresenceSoundGain(presence, 1)
    // Pop presence from followed
    state.followed.splice(state.followed.indexOf(presence), 1)
    // Pop power
    state.power.splice(state.power.indexOf(presence), 1)
    state.game.createdSounds.magicArrived.play()

    // If all presences arrived: The end!
    if (Object.keys(state.presences).reduce(
        (p, c) => p && state.presences[c].arrived, true)) {
        state.game.createdSounds.magicArrived.onStop.add(
            function () {
                state.won()
                state.game.createdSounds.magicArrived.onStop.removeAll()
            }
        )
    }
}

// Set player power and display effect/sound
function setPower(power, replace=false) {
    if (replace) state.power = []
    state.power.push(power)

    // visual effect when entering a different shrine
    var effect = addEffect(state, shrines[power].color, 0.5)
    effect.alpha = 0
    var tweenTo = state.game.add.tween(effect).to( { alpha: 1 }, 1000, "Linear")
    var tweenBack = state.game.add.tween(effect).to( { alpha: 0 }, 1000, "Linear")
    tweenTo.chain(tweenBack)
    tweenTo.start()
    state.game.createdSounds.magic.play()
    tweenBack.onComplete.add(() => effect.destroy())
}

// check if position is the same of a shrine
function isInShrine(position) {
    for (let k in shrines) {
        if (equalArrays(position, shrines[k].walkablePos)) return k
    }
    return null
}

// check if position is the same of a presence
function isInPresence(position) {
    for (let k in state.presences) {
        if (equalArrays(position, state.presences[k].position) &&
            !state.followed.includes(k))
            return k
    }
    return null
}

export function openTutWhenInPresence() {
    var presence = isInPresence(state.position)
    if (presence && state.power.includes(presence))
        checkTutorial(TUTORIAL_PHASES.searchingPresence, presence)
}

export function playButtonSound() {
    state.game.createdSounds.button.play()
}

// function createGameElements() {
//     console.log('Creating...')

//     // state.game.createdSounds.song.stop()
//     // hideInterface()
//     // startLevel()
//     // setTimeout(function () {
//     //     for (let p in state.presences) {
//     //         state.followed = p
//     //         presenceArrived(state)
//     //     }
//     // }, 2000)



//     // setTimeout(function () {
//     //     // TODO: tratar melhor qual música para/toca
//     //     state.game.createdSounds.song.stop()
//     //     // loadLevel2()
//     //     // toLevel2intro()
//     // }, 2000)

//     // loadLevel2()
//     // randomizePresencePositions(state.position)
//     // startLevel()

//     // openPage('controls', false)
//     // openPage('instrorstart', false)

//     // Debug
//     // state.effect2 = state.game.add.graphics(0, 0)
//     // state.effect2.beginFill(0xff0000, 1)
//     // state.effect2.drawRect(0, 0, 10, 10)
//     // state.effect2.endFill()
// }


function cheatLevel1() {
    for (let p in state.presences) {
        state.followed.push(p)
        presenceArrived(state, p)
    }
}
function cheatLevel2() {
    for (let p in state.presences) {
        state.followed.push(p)
    }
    // touchedDarkPresence()
}
window.cheats = {
    l1: cheatLevel1,
    l2: cheatLevel2
}
