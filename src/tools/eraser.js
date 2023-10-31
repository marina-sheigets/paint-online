import Tool from './tools';

export default class Eraser extends Tool {
	constructor(canvas, socket, id) {
		super(canvas, socket, id);
		this.listen();
	}

	listen() {
		this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
		this.canvas.onmouseup = this.mouseUpHandler.bind(this);
		this.canvas.onmousedown = this.mouseDownHandler.bind(this);
	}

	mouseUpHandler() {
		this.mouseDown = false;
		this.socket.send(
			JSON.stringify({
				method: 'draw',
				id: this.id,
				figure: {
					type: 'finish',
				},
			})
		);
	}

	mouseDownHandler(e) {
		this.mouseDown = true;
		this.ctx.beginPath();
		this.ctx.moveTo(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop);
	}

	mouseMoveHandler(e) {
		if (this.mouseDown) {
			this.socket.send(
				JSON.stringify({
					method: 'draw',
					id: this.id,
					figure: {
						type: 'eraser',
						lineWidth: this.ctx.lineWidth,
						color: this.ctx.fillStyle,
						strokeColor: this.ctx.strokeStyle,
						x: e.pageX - e.target.offsetLeft,
						y: e.pageY - e.target.offsetTop,
					},
				})
			);
		}
	}

	static draw(ctx, x, y, color, strokeStyle, lineWidth) {
		ctx.strokeStyle = '#fff';
		ctx.lineWidth = lineWidth;
		ctx.fillStyle = '#fff';
		ctx.lineTo(x, y);
		ctx.stroke();
		ctx.strokeStyle = strokeStyle;
		ctx.fillStyle = color;
	}
}
