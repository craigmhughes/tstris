import blocks from './types.json';

const BLOCK_SIZE = 20;

class Block {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    type: string;
    shape: number[];
    color: string;
    placed: boolean;
    pos: {
        x: number,
        y: number,
    }

    constructor(
        canvas: HTMLCanvasElement,
        ctx: CanvasRenderingContext2D
    ) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.type = Object.keys(blocks)[Math.floor(Math.random() * Object.keys(blocks).length)];
        this.shape = blocks[this.type as keyof typeof blocks].value;
        this.color = blocks[this.type as keyof typeof blocks].color;
        this.placed = false;
        this.pos = {
            x: BLOCK_SIZE * 5,
            y: 0,
        };

        console.log(`Initialised Block Type: ${this.type}`);
    }

    draw() {
        for(const [idx, val] of Array.from(this.shape.entries())) {
            if (!val) continue;

            const yOffset = Math.floor(idx / 4);
            this.ctx.fillStyle = this.color;
            this.ctx.fillRect(
                this.pos.x + (BLOCK_SIZE * (idx - (4 * (yOffset ?? 1)))),
                this.pos.y + (BLOCK_SIZE * (yOffset ?? 1)),
                BLOCK_SIZE, 
                BLOCK_SIZE
            );
        }

        if (this.pos.y + (BLOCK_SIZE * 2) < (this.canvas.height - BLOCK_SIZE)) this.pos.y += BLOCK_SIZE;
        else this.placed = true;
    }
}

export default Block;