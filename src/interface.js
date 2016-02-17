var req = require.context('./pages')
var pages = {}
req.keys().forEach(k => {
    var k2 = k.split('/')
    k2 = k2[k2.length-1].split('.')
    k2 = k2[k2.length-2]
    pages[k2] = req(k)
})
console.log(pages)
window.pages = pages
// var pages = {
//     mainmenu: require("text!./pages/mainmenu.html"),
//     controls: require("text!./pages/controls.html"),
//     instructions: require("text!./pages/instructions.html"),
//     instrorstart: require("text!./pages/instrorstart.html"),
//     history: require("text!./pages/history.html"),
//     cantsee: require("text!./pages/cantsee.html"),
//     end1: require("text!./pages/end1.html"),
//     l2intro: require("text!./pages/l2intro.html"),
//     l2intro2: require("text!./pages/l2intro2.html"),
//     l2intro3: require("text!./pages/l2intro3.html"),
//     l2intro3a: require("text!./pages/l2intro3a.html"),
//     l2intro4: require("text!./pages/l2intro4.html"),
//     l2intro5: require("text!./pages/l2intro5.html"),
//     lost2: require("text!./pages/lost2.html"),
//     l2end1: require("text!./pages/l2end1.html"),
//     l2end2: require("text!./pages/l2end2.html"),
//     l2end3: require("text!./pages/l2end3.html"),
//     credits: require("text!./pages/credits.html"),
//     tut1a: require("text!./pages/tut1a.html"),
//     tut1b: require("text!./pages/tut1b.html"),
// }

function getDiv(outer=false) {
    if (outer) return document.getElementById('interface-outer')
    else return document.getElementById('interface-menus')
}

export function setInterfaceBounds(bounds) {
    var outer = getDiv(true)
    bounds.map(
            function (val, index) { outer.style[this[index]] = val + 'px'},
            ["left", "top", "width", "height"])

    getDiv().style.padding = `${bounds[2]/8}px ${bounds[3]/8}px`
}

export function openPage(name, playSound=true, replace=null) {
    showInterface()
    var text = pages[name]
    if (replace)
        text = text.replace('{{}}', replace)
    getDiv().innerHTML = `<div class="page">${text}</div>`
    if (playSound) window.playButtonSound()
    window.scrollTo(0, 0)
}

export function showInterface() {
    var inter = getDiv()
    inter.style.zIndex = 1
    inter.style.opacity = 1
    var outer = getDiv(true)
    outer.style.pointerEvents = 'auto'
}

export function hideInterface() {
    var inter = getDiv()
    inter.style.zIndex = -1
    inter.style.opacity = 0
    inter.innerHTML = ''
    var outer = getDiv(true)
    outer.style.pointerEvents = 'none'
}

export function hideLoadingScreen() {
    var el = document.getElementById('loading-screen')
    if (el) el.parentNode.removeChild(el)
}
