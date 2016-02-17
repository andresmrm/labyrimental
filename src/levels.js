import {randInt} from './utils.js'
import {hideInterface, openPage} from './interface.js'
import {addEffect, loadVision} from './vision.js'
import {randomizePresencePositions} from './randPos.js'
import {changeDarkPresencePos, initPlayerPos} from './movement.js'
import {createPositionedAudios} from './createAudios.js'
import {touchedDarkPresence, stopSong, playSong, playButtonSound,
        openTutWhenInPresence} from './game.js'
import {state} from './store.js'

import {setListenerPos} from './audio.js'
import {tweenPos} from './movement.js'


var darkPresencePhrases = [
    'Raaaaarrrrr!!!!',
    'Embrace Darkness!',
    "You can't win!",
    "You can't hide!",
    "You can't escape!",
    "You are doomed!",
    'I found you.',
    'Again?',
    'Run faster next time.',
    'Muhahahahah!',
    'Unstoppable!',
]


function fadeGame(fadeTime=2000) {
    state.state = 'finished'
    addEffect(state, 0x000000, 1)
    state.effect.alpha = 0
    state.game.add.tween(state.effect)
        .to({alpha: 1}, fadeTime, "Linear", true)
}


function wonLevel1() {
    state.game.createdSounds.harp.play()
    fadeOutPositionalSounds()
    playSong('song')
    fadeGame()
    openPage('end1', false)
}

function introLevel1() {
    if (state.playIntro) openPage('controls')
    else startLevel()
}

function introLevel2() {
    localStorage.lastLevel = 1
    if (state.playIntro) {
        hideInterface()
        stopSong(1000)
        state.game.createdSounds.darkSpell.play()
        state.game.createdSounds.darkSpell.onStop.add(
            function () {
                state.game.createdSounds.darkSpell.onStop.removeAll()
                randomizePresencePositions(state.position)
                openPage('l2intro', false)
                playSong('darkSong', 1000)
            }
        )
    } else {
        randomizePresencePositions(state.position)
        startLevel()
    }
}

function fadeOutPositionalSounds() {
    // Move player up so should not hear positional sounds.
    var oldPos = state.position
    var posSetter = (pos) => setListenerPos(state.game.sound.context, pos)
    tweenPos(oldPos, [oldPos[0], oldPos[1], 10], posSetter, 1000, state, 'Move')
}

function wonLevel2() {
    state.state = 'finished'
    fadeOutPositionalSounds()
    state.game.createdSounds.end2.play()
    state.game.createdSounds.end2.onStop.add(
        function() {
            state.game.createdSounds.end2.onStop.removeAll()
            fadeGame(1000)
            openPage('l2end1', false)
            playSong('song')
        }
    )
}

function lostLevel2() {
    state.game.createdSounds.rarr.play()
    fadeGame(1000)
    state.playIntro = false
    openPage('lost2', false,
             darkPresencePhrases[randInt(darkPresencePhrases.length)])
    // game.sound.masterGain
    fadeOutPositionalSounds()
}

function loadLevel(n) {
    state.level = n
    state.position = [4, 4, 0]
    state.followed = []
    state.power = []
    if (n == 1) {
        randomizePresencePositions(state.position)
        state.won = wonLevel1
        state.intro = introLevel1
        state.tint = 0xffffff
        state.filters = []
        state.onMoved = openTutWhenInPresence
    } else if (n == 2) {
        state.won = wonLevel2
        state.lost = lostLevel2
        state.intro = introLevel2
        state.tint = 0x202020
        state.filters = [state.game.createdFilters.gray]
        state.onMoved = () => changeDarkPresencePos(state.position,
                                                    touchedDarkPresence)

        // Disable tutorial
        state.tutorial = 0
    }
}

export function startLevel() {
    hideInterface()
    initPlayerPos()
    createPositionedAudios()
    state.state = 'starting'
    loadVision(state)
}

export function pickLevel(n, playSound=true) {
    loadLevel(n)
    state.intro()
    if(playSound) playButtonSound()
}
