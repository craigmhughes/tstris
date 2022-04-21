import Block from "./Block/Block";

class Game {
    blockSize: number;
    fps: number;
    now: null | number;
    then: number;
    interval: number;
    delta: null | number;
    width: number;
    height: number;
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    grid: number[];
    activeBlock: Block | null;

    constructor(
        fps: number,
        width: number,
        height: number,
        blockSize: number,
    ) {
        this.blockSize = blockSize;
        this.fps = fps;
        this.now = null;
        this.then = Date.now();
        this.interval = 1000 / fps;
        this.delta = null;
        this.width = width;
        this.height = height;
        this.canvas = document.getElementById('screen') as HTMLCanvasElement;
        this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
        this.grid = new Array(
            (this.height / this.blockSize) * (this.width / this.blockSize)
        ).fill(0);
        this.activeBlock = null;

        console.log(this.grid);

        this.setup();
    }

    setup() {
        this.canvas.width = this.width;
        this.canvas.height = this.height;

        document.addEventListener('keypress', (e) => {
            if (!this.activeBlock) return;

            if (e.key === 'w') this.activeBlock.rotate();
            else if (e.key === 'a') this.activeBlock.move('left');
            else if (e.key === 's') this.activeBlock.move('down');
            else if (e.key === 'd') this.activeBlock.move('right');

            this.reset();
            this.draw();
            this.activeBlock.draw();
        });
    }

    reset() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    }

    check() {
        if (!this.activeBlock) return;

        for(const [i, v] of Object.entries(this.activeBlock.shape)) {
            if (v !== 0) {
                const xToCheck = (this.activeBlock.pos.x / this.blockSize);
                const yToCheck = (this.activeBlock.pos.y / this.blockSize);
                const yBreak = Math.floor((this.width / this.blockSize));
                const yOffset = (Math.floor(parseInt(i) / 4) * yBreak);
                const startPoint = (yToCheck * yBreak) + xToCheck;

                // this.grid[(startPoint + Math.floor(parseInt(i) % 4) + yOffset)] = v;
            }
        }
    }

    draw() {
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(0, 0, this.width, this.height);

        const colors = ['black', 'orange', 'blue', 'red', 'green', 'cyan', 'purple', 'yellow'];

        for(const [i, v] of Object.entries(this.grid)) {
            if (v === 0) continue;

            const xOffset = Math.floor((this.height / this.blockSize));
            const yOffset = Math.floor((this.width / this.blockSize));
            this.ctx.fillStyle = colors[v];
            this.ctx.fillRect(
                Math.floor(parseInt(i) % yOffset) * this.blockSize, 
                Math.floor(parseInt(i) / yOffset) * this.blockSize, 
                this.blockSize, 
                this.blockSize
            );

            // this.ctx.fillStyle = 'black';
            // this.ctx.fillText(i, Math.floor(parseInt(i) % yOffset) * this.blockSize, 
            // Math.floor(parseInt(i) / yOffset) * this.blockSize);

        }
    }
    
    main() {
        this.draw();

        if (!this.activeBlock || this.activeBlock?.placed) this.activeBlock = new Block(this.canvas, this.ctx, this.blockSize);
        this.activeBlock.draw();
        this.check();

        if (this.activeBlock.pos.y + (this.blockSize * 2) < (this.canvas.height - this.blockSize)) this.activeBlock.pos.y += this.blockSize;
        else this.activeBlock.placed = true;
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
