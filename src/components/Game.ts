import Block from "./Block/Block";

class Game {
    fps: number;
    now: null | number;
    then: number;
    interval: number;
    delta: null | number;
    width: number;
    height: number;
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    activeBlock: Block | null;

    constructor(
        fps: number,
        width: number,
        height: number,
    ) {
        this.fps = fps;
        this.now = null;
        this.then = Date.now();
        this.interval = 1000 / fps;
        this.delta = null;
        this.width = width;
        this.height = height;
        this.canvas = document.getElementById('screen') as HTMLCanvasElement;
        this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
        this.activeBlock = null;

        this.setup();
    }

    setup() {
        this.canvas.width = this.width;
        this.canvas.height = this.height;
    }

    reset() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    }
    
    main() {
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(0, 0, this.width, this.height);

        if (!this.activeBlock) this.activeBlock = new Block(this.canvas, this.ctx);
        else this.activeBlock.draw();
    }
    
    play() {
        requestAnimationFrame(() => this.play());

        const now = Date.now();
        const elapsed = now - this.then;
        
        if (elapsed > this.interval) {
            this.then = now - (elapsed % this.interval);
            this.reset();
            this.main();
        }
    }
}

export default Game;
