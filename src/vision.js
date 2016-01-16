import {posDirToText, getBounds} from './utils.js'
import {setInterfaceBounds} from './interface.js'
import {state} from './store.js'


function setVision(isResize=false) {
    if (!isResize) state.loadingVision = false

    if (state.img) state.img.destroy()
    state.img = state.game.add.image(0, 0, posDirToText(state.position, state.direction))
    state.layers.back.add(state.img)
    var r = Math.min(state.game.width/state.img.width, state.game.height/state.img.height)
    state.img.scale.setTo(r)
    state.img.x = (state.game.width - state.img.width) / 2
    state.img.y = (state.game.height - state.img.height) / 2

    // Round bounds
    var bounds = ['x', 'y', 'width', 'height']
    bounds.map((key) => state.img[key] = Math.round(state.img[key]))

    // Set tint
    if (state.tint) state.img.tint = state.tint
    // Set filter
    if (state.filters.length) state.img.filters = state.filters

    // Map img bounds to interface
    setInterfaceBounds(getBounds(state.img))

    // Enable mouse move
    if (state.onTap) {
        state.img.inputEnabled = true
        state.img.events.onInputUp.add(state.onTap, this)
    }

    if (state.onSetVision) state.onSetVision(isResize)
}

export function addEffect(state, color, alpha) {
    if (state.effect) state.effect.destroy()
    state.effect = state.game.add.graphics(0, 0)
    state.effect.beginFill(color, alpha)
    state.effect.drawRect(state.img.x, state.img.y, state.img.width, state.img.height)
    state.effect.endFill()
    state.layers.front.add(state.effect)
    return state.effect
}

export function loadVision(state) {
    var s = posDirToText(state.position, state.direction)
    if (!state.game.cache.checkImageKey(s)) {
        state.loadingVision = true
        state.game.load.image(s, 'assets/map/' + s + '.jpg').onFileComplete.add(() => setVision())
        state.game.load.start()
    } else {
        setVision()
    }
}

export function resize() {
    state.game.scale.setGameSize(window.innerWidth, window.innerHeight)
    setVision(true)
}

// Resizes game on window resize
// based on: http://www.html5gamedevs.com/topic/13900-doubt-about-making-my-game-responsive-on-onresize/
// The delay is supposed to help on some devices
window.addEventListener('resize',
                        () => state.game.time.events.add(200, resize),
                        false)
