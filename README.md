# Labyrimental (Alfa)

A free software game made with [Luxrender](http://luxrender.net) (through [Ambulatilis Lux](https://github.com/andresmrm/ambulatilis-lux)) and [Phaser](http://phaser.io).

Code in [ES6](https://en.wikipedia.org/wiki/ECMAScript#Harmony.2C_6th_Edition) (through [Babel](https://babeljs.io)) and packed with [Webpack](http://webpack.github.io).

Sound editing done with [Audacity](http://www.audacityteam.org) and map modeling with [Blender](https://www.blender.org).


## Play

[Play here!](https://andresmrm.github.io/labyrimental)

## Build&Run

If you want to modify the source code and build it, you will need to install [Node.js](https://nodejs.org) which should come with a copy of [npm](https://docs.npmjs.com/getting-started/installing-node).

Copy the files of this game to a folder and, inside of that folder, run this line to install dependencies:

```
npm install
```

And this line to build and run a small server that should automatically update the browser on code changes:

```
npm run dev
```

Than open a browser and check the game in this local address: `http://localhost:5001`

(To consolidate source code changes in the dist folder, use `npm run dist`, and to serve these files (without "hotswap") use `npm run viewdist`.)

## Blend file

The .blend file was too big for GitHub, but you can download it [here](https://mega.nz/#!F9cjCZSC!KZB_5pZnb0QAVpoWKXPiWtWhiWG1uceyc599kUmT4Zw).

It should come with textures and a `zone.py` file used for the rendering.

## Rendering

If you want to modify the map and rerender it, you should do something like this.

1. Clone or download this repository to a folder, let's say `/path/to/laby`.
2. Download the blend file from the link above, extract it in a folder, let's say, `/path/to/blend`.
3. Use Blender to modify the .blend, save it.
4. Clone or download [Ambulatilis Lux](https://github.com/andresmrm/ambulatilis-lux) to a folder, let's say, `/path/to/amblux`.
5. Create a folder to store PNGs and FLMs, let's call it `/path/to/store`.

Great, now:

```
cd /path/to/blend
blender aberto.blend -b -P /path/to/amblux/src/amblux.py -- /path/to/store /path/to/laby/assets/map -T 60 -w 60 -t 6 -j
```

Adjust the paths and parameters for your case. See the help for more info:

```
blender -b -P /path/to/amblux/src/amblux.py -- --help
```

And also check [Ambulatilis Lux](https://github.com/andresmrm/ambulatilis-lux).
There is a less complex .blend there.

## Audios

The Audacity projects used to created the audios can be found [here](https://mega.nz/#!xtkEGCTL!AOQlbfsMH8beXq56l7XdTs8gVezfbUBPzHAEJ8iAqww).
Some audios used were not made by me, check the credits section bellow.


## Credits

These are works from other people that were used in this game.

### Sounds

Most of the sounds were modified by me, but these are the original ones:

- stream_cold: https://freesound.org/people/Corsica_S/sounds/92821/
- steps: https://freesound.org/people/Phil25/sounds/208103/
- wind: https://freesound.org/people/Zixem/sounds/69509/
- fire: https://freesound.org/people/zmb94/sounds/74963/
- earth: https://freesound.org/people/uagadugu/sounds/222521/
- magic_slow: https://www.freesound.org/people/RICHERlandTV/sounds/216089/
- magic_request: https://www.freesound.org/people/Timbre/sounds/75712/
- magic_arrived: https://www.freesound.org/people/Timbre/sounds/75832/
- harp: https://www.freesound.org/people/Timbre/sounds/188333/
- magic_no: https://www.freesound.org/people/Timbre/sounds/221682/
- harp_start: https://www.freesound.org/people/Robinhood76/sounds/178318/
- song: https://www.freesound.org/people/Erokia/sounds/330210/
- button: https://www.freesound.org/people/Chocobaggy/sounds/252681/
- dark_song: https://www.freesound.org/people/Headphaze/sounds/177101/
- dark_spell:
  - gargle_spell: https://www.freesound.org/people/Spennnyyy/sounds/323502/
  - tremor: https://www.freesound.org/people/Marec/sounds/19994/

### Models

- grass: http://www.luxrender.net/forum/viewtopic.php?f=14&t=550&hilit=grass+patch&start=10

### Textures

- rock: http://opengameart.org/content/terrainsrockpack01

### Fonts

- klaudia: https://fontlibrary.org/en/font/klaudia-and-berenika


## Contact

If you want to contact me, my e-mail starts with **andres**, then comes a **@**, and in the end **inventati.org**.
