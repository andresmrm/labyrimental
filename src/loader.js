import {posDirToText} from './utils.js'
import {move, initPlayerPos} from './movement.js'
import {hideLoadingScreen, openPage} from './interface.js'
import {initKeyboardInput, initMouseInput} from './input.js'
import {createCommonAudios} from './createAudios.js'
import {shrines, state} from './store.js'
import {interact, playButtonSound, onSetVision} from './game.js'
import {resize} from './vision.js'
import {pickLevel, startLevel} from './levels.js'
import {closeTutMsg} from './tutorial.js'

export function mainLoad() {
    state.game.load.onLoadStart.add(function () {
        console.log('Loading...')
    }, this)

    state.game.load.onLoadComplete.add(function () {
        console.log('Done loading')
        state.game.load.onLoadStart.removeAll()
        state.game.load.onLoadComplete.removeAll()
        mainInit()
    }, this)

    var firstImg = posDirToText(state.position, state.direction)
    state.game.load.image(firstImg, `assets/map/${firstImg}.jpg`)

    state.game.load.audio('button', ['assets/audio/button.ogg'])
    state.game.load.audio('stream', ['assets/audio/stream_cold.ogg'])
    state.game.load.audio('wind', ['assets/audio/wind.ogg'])
    state.game.load.audio('fire', ['assets/audio/fire.ogg'])
    state.game.load.audio('earth', ['assets/audio/earth.ogg'])
    state.game.load.audio('magic', ['assets/audio/magic_slow.ogg'])
    state.game.load.audio('magic_request', ['assets/audio/magic_request.ogg'])
    state.game.load.audio('magic_arrived', ['assets/audio/magic_arrived.ogg'])
    state.game.load.audio('magic_no', ['assets/audio/magic_no.ogg'])
    state.game.load.audio('harp', ['assets/audio/harp.ogg'])
    state.game.load.audio('harp_start', ['assets/audio/harp_start.ogg'])
    state.game.load.audio('steps', ['assets/audio/steps.ogg'])
    state.game.load.audio('dark_spell', ['assets/audio/dark_spell.ogg'])
    state.game.load.audio('dark_presence', ['assets/audio/dark_presence.ogg'])
    state.game.load.audio('dark_song', ['assets/audio/dark_song.ogg'])
    state.game.load.audio('rarr', ['assets/audio/rarr.ogg'])
    state.game.load.audio('end2', ['assets/audio/end2.ogg'])

    state.game.load.script('gray', 'vendor/Gray.js')

    state.game.load.start()
}

// First init called. Should be called only once, and before any level.
function mainInit() {
    hideLoadingScreen()

    state.game.stage.backgroundColor = '#000000'
    // Used to render some things always in front of others
    state.layers = {
        back: state.game.add.group(),
        front: state.game.add.group(),
    }

    state.onSetVision = onSetVision
    resize()

    // initialize state presences (needed to later randomize them)
    for (let k in shrines) {
        state.presences[k] = {}
    }

    // state.game.createdFilters = {gray: state.game.add.filter('Gray')}
    createCommonAudios()
    initKeyboardInput(move, interact)
    initMouseInput(move, interact)

    if (!localStorage.getItem('lastLevel')) {
        // No level unlocked
        pickLevel(1, false)

        // TODO: only for debug, comment!
        // startLevel()

    } else {
        // Level 2 unlocked
        openPage('mainmenu', false)
    }
}

// Exported functions, so interface can call them
window.openPage = openPage
window.pickLevel = pickLevel
window.startLevel = startLevel
window.closeTutMsg = closeTutMsg
window.playButtonSound = playButtonSound
