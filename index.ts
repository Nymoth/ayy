import Game from './core/game';
import CanvasRenderer from './renderers/canvas.renderer';
import KeyboardController from './controllers/keyboard.controller';

const renderer = new CanvasRenderer(window, 500, 500);
const controller = new KeyboardController(window, renderer);
const game = new Game(renderer, controller);
game.start();
