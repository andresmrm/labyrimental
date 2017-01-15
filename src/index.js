// ---------------------------------------------------------
// Copyright (C) 2016  Andrés M. R. Martano
//
//     This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.
//
//     This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
//     You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.
// ---------------------------------------------------------


import {mainLoad} from './loader.js'
import {playSong} from './game.js'
import {state} from './store.js'

function preload() {
    //state.game.stage.disableVisibilityChange = true

    state.game.load.audio('song', ['assets/audio/song.ogg'])
}

function create() {
    var song = state.game.add.audio('song', 1, true)
    state.game.sound.setDecodedCallback([song], () => playSong('song'), this)
    state.game.createdSounds = {song}

    state.game.load.crossOrigin = 'anonymous'

    // TODO: mainLoad needs to be called via setTimeout, no idea why...
    // If called directly loader stops in the middle.
    // mainLoad()
    setTimeout(mainLoad, 10)
}

function update() {
}

state.game = new Phaser.Game(0, 0, Phaser.AUTO, 'app',
                           { preload: preload,
                             create: create,
                             update: update })
