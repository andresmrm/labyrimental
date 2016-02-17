import {state} from './store.js'
import {hideInterface, openPage} from './interface.js'


export var TUTORIAL_PHASES = {
    startingGame: 1,
    searchingShrine: 2,
    searchingPresence: 3,
    callingPresence: 4,
    returningPresence: 5,
}


export function closeTutMsg() {
    hideInterface()
    state.tutorial += 1
}

export function checkTutorial(phase) {
    if (phase == state.tutorial) openPage('tut' + state.tutorial + 'a')
}
