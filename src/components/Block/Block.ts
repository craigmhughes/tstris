import blocks from './types.json';

class Block {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    type: string;
    shapeIndex: number;
    shape: number[];
    color: string;
    placed: boolean;
    blockSize: number;
    pos: {
        x: number,
        y: number,
    }

    constructor(
        canvas: HTMLCanvasElement,
        ctx: CanvasRenderingContext2D,
        blockSize: number,
    ) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.blockSize = blockSize;
        this.type = Object.keys(blocks)[Math.floor(Math.random() * Object.keys(blocks).length)];
        this.shapeIndex = 0;
        this.shape = blocks[this.type as keyof typeof blocks].values[this.shapeIndex] as number[];
        this.color = blocks[this.type as keyof typeof blocks].color;
        this.placed = false;
        this.pos = {
            x: this.blockSize * 5,
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
                this.pos.x + (this.blockSize * (idx - (4 * (yOffset ?? 1)))),
                this.pos.y + (this.blockSize * (yOffset ?? 1)),
                this.blockSize, 
                this.blockSize
            );
        }
    }

    rotate() {
        if (blocks[this.type as keyof typeof blocks].values[this.shapeIndex + 1]) {
            this.shapeIndex += 1;
        } else if (this.shapeIndex > 0) {
            this.shapeIndex = 0;
        }

        this.shape = blocks[this.type as keyof typeof blocks].values[this.shapeIndex] as number[];
    }

    move(direction: string) {
        if (direction === 'left' && this.pos.x > 0) this.pos.x -= this.blockSize;
        else if (direction === 'right' && this.pos.x < (this.canvas.width - (this.blockSize * 3))) this.pos.x += this.blockSize;
        else if (direction === 'down' && this.pos.y < (this.canvas.height - (this.blockSize * 3))) this.pos.y += this.blockSize;
    }
}

export default Block;