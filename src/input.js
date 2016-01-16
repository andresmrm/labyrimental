import {getBounds} from './utils.js'
import {state} from './store.js'


export function initKeyboardInput(fMove, fInteract) {
    var cursors = ['UP', 'DOWN', 'LEFT', 'RIGHT']
    cursors.map(
        (key) => state.game.input.keyboard.addKey(
            Phaser.Keyboard[key]).onDown.add(fMove, this, null, key))

    state.game.input.keyboard.addKey(
        Phaser.Keyboard.SPACEBAR).onDown.add(fInteract, this, null)
}

export function initMouseInput(fMove, fInteract) {
    state.onTap = (manager, pointer) => onTap(pointer, fMove, fInteract)
}

function onTap(pointer, fMove, fInteract) {
    var x = pointer.x
    var y = pointer.y

    // The image is divided in 5 areas: top, bottom, left, right and
    // center. A bigger p makes the center smaller and the other areas
    // bigger but more narrow.
    var p = 0.28
    var [ix, iy, iw, ih] = getBounds(state.img)
    var ty = iy + ih * p
    var by = iy + ih * (1-p)
    var lx = ix + iw * p
    var rx = ix + iw * (1-p)
    // var area = null

    // Left, Right or Middle
    if (y > ty && y < by) {
        if (x < lx) fMove(null, 'LEFT') //area = 'left'
        else if (x > rx) fMove(null, 'RIGHT') //area = 'right'
        else fInteract() //area = 'center'
        // Tor or Bottom
    } else if (x > lx && x < rx) {
        if (y < ty) fMove(null, 'UP') //area = 'top'
        else if (y > by) fMove(null, 'DOWN') //area = 'bottom'
    }
}
