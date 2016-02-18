import {state} from './store.js'
import {hideInterface, openPage} from './interface.js'


export var TUTORIAL_PHASES = {
    startingGame: 1,
    searchingShrine: 2,
    searchingPresence: 3,
    changedPower: '2x',
    callingPresence: 4,
    returningPresence: 5,
}


export function closeTutMsg() {
    hideInterface()
    state.tutorial += 1
}

export function checkTutorial(phase, replace=null) {
    console.log(phase, replace)
    if (phase == state.tutorial)
        openPage('tut' + state.tutorial + 'a', true, replace)
    // Handle when player changed power while still in the tutorial
    else if (phase == TUTORIAL_PHASES.changedPower &&
             state.tutorial == TUTORIAL_PHASES.searchingPresence) {
        state.tutorial = TUTORIAL_PHASES.searchingShrine
        openPage('tut' + TUTORIAL_PHASES.changedPower + 'a', true, replace)
    }
}
