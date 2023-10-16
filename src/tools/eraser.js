import Tool from './tools';

export default class Eraser extends Tool {
	constructor(canvas) {
		super(canvas);
	}

	draw(x, y) {
		this.ctx.lineTo(x, y);
		this.ctx.strokeStyle = '#fff';
		this.ctx.stroke();
	}
}
