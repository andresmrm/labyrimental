import {posDirToText, getBounds} from './utils.js'
import {setInterfaceBounds} from './interface.js'
import {state} from './store.js'


function setVision(isResize=false, move=null) {
    if (!isResize) state.loadingVision = false

    if (!move || !state.animateMove) {
        // Move without animation
        if (state.img) state.img.destroy()
        state.img = state.game.add.image(0, 0, posDirToText(state.position, state.direction))
        state.layers.back.add(state.img)
        var r = Math.min(state.game.width/state.img.width, state.game.height/state.img.height)
        state.img.scale.setTo(r)
        state.img.x = (state.game.width - state.img.width) / 2
        state.img.y = (state.game.height - state.img.height) / 2
    } else {
        var newImg = state.game.add.image(0, 0, posDirToText(state.position, state.direction))
        state.layers.back.add(newImg)
        var r2 = Math.min(state.game.width/newImg.width, state.game.height/newImg.height)
        newImg.scale.setTo(r2)
        var zero_x = (state.game.width - state.img.width) / 2
        var zero_y = (state.game.height - state.img.height) / 2
        newImg.x = zero_x
        newImg.y = zero_y
        // Round bounds
        var bounds2 = ['x', 'y', 'width', 'height']
        bounds2.map((key) => newImg[key] = Math.round(newImg[key]))

        var tween = null
        var tweenNew = null

        if (move == 'RIGHT') {
            newImg.x = zero_x + state.img.width
            tweenNew = state.game.add.tween(newImg).to({x:zero_x}, 1000, "Linear")
            tween = state.game.add.tween(state.img).to({x:zero_x-state.img.width}, 1000, "Linear")
        } else if (move == 'LEFT') {
            newImg.x = zero_x - newImg.width
            tweenNew = state.game.add.tween(newImg).to({x:zero_x}, 1000, "Linear")
            tween = state.game.add.tween(state.img).to({x:zero_x+state.img.width}, 1000, "Linear")
        } else if (move == 'UP') {
            state.layers.front.add(state.img)
            newImg.x = zero_x + newImg.width/4
            newImg.y = zero_y + newImg.height/4
            var h = newImg.height
            var w = newImg.width
            newImg.height = h/2
            newImg.width = w/2
            tweenNew = state.game.add.tween(newImg).to({x:zero_x, y:zero_y, height:h, width:w}, 1000, "Linear")
            tween = state.game.add.tween(state.img).to({alpha:0}, 1000, "Linear")
        } else if (move == 'DOWN') {
            // state.layers.front.add(state.img)
            newImg.alpha = 0
            tweenNew = state.game.add.tween(newImg).to({alpha:1}, 1000, "Linear")
            tween = state.game.add.tween(state.img).to({
                x:zero_x + state.img.width/4,
                y:zero_y + state.img.height/4,
                height:state.img.height/2,
                width:state.img.width/2
            }, 1000, "Linear")
        }

        tweenNew.start()
        tween.start()
        tween.onComplete.add(() => {
            if (state.img) state.img.destroy()
            state.img = newImg
            tween.onComplete.removeAll()
        })
    }

    // if (state.img) state.img.destroy()
    // state.img = state.game.add.image(0, 0, posDirToText(state.position, state.direction))
    // state.layers.back.add(state.img)
    // var r = Math.min(state.game.width/state.img.width, state.game.height/state.img.height)
    // state.img.scale.setTo(r)
    // state.img.x = (state.game.width - state.img.width) / 2
    // state.img.y = (state.game.height - state.img.height) / 2

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

export function loadVision(state, move=null) {
    var s = posDirToText(state.position, state.direction)
    if (!state.game.cache.checkImageKey(s)) {
        state.loadingVision = true
        var signal = state.game.load.image(s, 'assets/map/' + s + '.jpg').onFileComplete
        signal.add(() => {
            setVision(false, move)
            signal.removeAll()
        })
        state.game.load.start()
    } else {
        setVision(false, move)
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
