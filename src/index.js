import {mainLoad} from './loader.js'
import {playSong} from './game.js'
import {state} from './store.js'

function preload() {
    // TODO: Tirar isso?
    state.game.stage.disableVisibilityChange = true

    state.game.load.audio('song', ['assets/audio/song.ogg'])
}

function create() {
    var song = state.game.add.audio('song', 1, true)
    state.game.sound.setDecodedCallback([song], () => playSong('song'), this)
    state.game.createdSounds = {song}
    mainLoad()
}

function update() {
}

state.game = new Phaser.Game(0, 0, Phaser.AUTO, 'app',
                           { preload: preload,
                             create: create,
                             update: update })
