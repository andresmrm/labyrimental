import {addSound, setPannerPos} from './audio.js'
import {shrines, state} from './store.js'


export function createCommonAudios() {
    // steps sound
    var steps = state.game.add.audio('steps')
    steps.allowMultiple = true
    for (let i = 0; i < 6; i++) {
        steps.addMarker(i, i, 1)
    }

    // more sounds
    Object.assign(state.game.createdSounds, {
        steps,
        harp: state.game.add.audio('harp', 0.8),
        harpStart: state.game.add.audio('harp_start', 0.8),
        button: state.game.add.audio('button', 0.5),
        magic: state.game.add.audio('magic'),
        magicNo: state.game.add.audio('magic_no'),
        magicRequest: state.game.add.audio('magic_request'),
        magicArrived: state.game.add.audio('magic_arrived'),
        darkSpell: state.game.add.audio('dark_spell', 1.5),
        darkSong: state.game.add.audio('dark_song', 1, true),
        darkPresence: state.game.add.audio('dark_presence', 1, true),
        rarr: state.game.add.audio('rarr'),
        end2: state.game.add.audio('end2'),
    })
}

export function createPositionedAudios() {
    for (let k in shrines) {
        var shrine = shrines[k]
        // Add shrine
        if (!shrine.sound)
            shrine.sound =
                addSound(state.game, shrine.position,
                        shrine.soundName, shrine.gain)

        var presence = state.presences[k]
        // Add presence
        if (!presence.sound) {
            presence.sound =
                addSound(state.game, presence.position,
                         shrine.soundName, shrine.gain)
        } else {
            setPannerPos(presence.sound.panner, presence.position)
        }
        changePresenceSoundGain(k, 1)
    }

    // Dark Presence
    if (state.level == 2) {
        var darkPres = state.darkPresence
        if (!darkPres.sound) {
            state.darkPresence.sound =
                addSound(state.game, darkPres.position,
                         'dark_presence', 1.5)
        } else {
            setPannerPos(darkPres.sound.panner, darkPres.position)
            state.darkPresence.sound.volume.gain.value = 1
        }
    } else {
        if (state.darkPresence.sound) {
            state.darkPresence.sound.volume.gain.value = 0
        }
    }
}

export function changePresenceSoundGain(presenceName, mult) {
    state.presences[presenceName].sound.volume.gain.value =
        shrines[presenceName].gain * mult
}
