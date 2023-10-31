import Tool from './tools';

export default class Line extends Tool {
	constructor(canvas, socket, id) {
		super(canvas, socket, id);
		this.listen();
	}

	listen() {
		this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
		this.canvas.onmouseup = this.mouseUpHandler.bind(this);
		this.canvas.onmousedown = this.mouseDownHandler.bind(this);
	}

	mouseUpHandler(e) {
		this.mouseDown = false;
		this.socket.send(
			JSON.stringify({
				method: 'draw',
				id: this.id,
				figure: {
					type: 'line',
					lineWidth: this.ctx.lineWidth,
					color: this.ctx.fillStyle,
					strokeColor: this.ctx.strokeStyle,
					startX: this.currentX,
					startY: this.currentY,
					x: e.pageX - e.target.offsetLeft,
					y: e.pageY - e.target.offsetTop,
				},
			})
		);
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
		this.currentX = e.pageX - e.target.offsetLeft;
		this.currentY = e.pageY - e.target.offsetTop;
		this.ctx.beginPath();
		this.ctx.moveTo(this.currentX, this.currentY);
		this.saved = this.canvas.toDataURL();
	}

	mouseMoveHandler(e) {
		if (this.mouseDown) {
			this.draw(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop);
		}
	}

	draw(x, y) {
		const img = new Image();
		img.src = this.saved;
		img.onload = async function () {
			this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
			this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
			this.ctx.beginPath();
			this.ctx.moveTo(this.currentX, this.currentY);
			this.ctx.lineTo(x, y);
			this.ctx.stroke();
		}.bind(this);
	}

	static staticDraw(ctx, startX, startY, x, y, color, strokeStyle, lineWidth) {
		ctx.strokeStyle = strokeStyle;
		ctx.fillStyle = color;
		ctx.lineWidth = lineWidth;
		ctx.beginPath();
		ctx.moveTo(startX, startY);
		ctx.lineTo(x, y);
		ctx.stroke();
	}
}
