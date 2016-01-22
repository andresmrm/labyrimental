export var shrines = {
    water: {
        position: [10, 0, 0],
        walkablePos: [9, 0, 0],
        soundName: 'stream',
        gain: 15,
        // color: 0x0000ff,
        color: 0x00376e,
    },
    earth: {
        position: [8, 10, 0],
        walkablePos: [8, 9, 0],
        soundName: 'earth',
        gain: 2,
        // color: 0xa16020,
        color: 0x376e00,
    },
    air: {
        position: [0, -2, 0],
        walkablePos: [0, -1, 0],
        soundName: 'wind',
        gain: 4,
        // color: 0xaaaaaa,
        color: 0x3a0371,
    },
    fire: {
        position: [-2, 7, 0],
        walkablePos: [-1, 7, 0],
        soundName: 'fire',
        gain: 4,
        // color: 0xff0000,
        color: 0x6e3700,
    }
}

export var state = {
    state: 'pregame',
    level: 1,
    position: [4, 4, 0],
    direction: 'e',
    followed: [],
    presences: {},
    darkPresence: {},
    power: [],
    filters: [],
    tint: null,
    // if is waiting the load of an image for the vision
    loadingVision: false,
    // if should play intro or skip it
    playIntro: true,
    // current playing or last played song
    currentSong: null,
    // if should animate player moves
    animateMove: false,
}


// Debug TODO: remover?
window.s = state
