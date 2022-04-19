import Game from './components/Game';

const FRAME_RATE = 1;
const WIDTH = 300;
const HEIGHT = 500;
const BLOCK_SIZE = 20;

const game = new Game(
    FRAME_RATE,
    WIDTH,
    HEIGHT,
    BLOCK_SIZE,
);

game.play();