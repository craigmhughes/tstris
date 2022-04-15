import Game from './components/Game';

const FRAME_RATE = 30;
const WIDTH = 300;
const HEIGHT = 500;

const game = new Game(
    FRAME_RATE,
    WIDTH,
    HEIGHT,
);

game.play();