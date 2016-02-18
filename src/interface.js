// Require all pages in ./pages and populate a dict where the values
// are the text contents
var req = require.context('./pages')
var pages = {}
req.keys().forEach(k => {
    // for each file use only the filename, without extension, as key
    var k2 = k.split('/')
    k2 = k2[k2.length-1].split('.')
    k2 = k2[k2.length-2]
    pages[k2] = req(k)
})


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
        text = text.replace(/\{\{\}\}/g, replace)
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
