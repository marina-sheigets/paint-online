import { makeAutoObservable } from 'mobx';

class CanvasState {
	canvas = null;
	undoList = []; // actions we made
	redoList = []; //actions we undo
	username = '';

	socket = null;
	sessionId = null;

	messages = [];

	addMessage(message) {
		this.messages.unshift(message);
	}

	deleteMessage() {
		this.messages.pop();
	}
	constructor() {
		makeAutoObservable(this);
	}

	setSessionId(value) {
		this.sessionId = value;
	}

	setSocket(value) {
		this.socket = value;
	}
	setUsername(value) {
		this.username = value;
	}
	setCanvas(canvas) {
		this.canvas = canvas;
	}

	pushToUndo(data) {
		this.undoList.push(data);
	}

	pushToRedo(data) {
		this.redoList.push(data);
	}

	undo() {
		let ctx = this.canvas.getContext('2d');
		if (this.undoList.length > 0) {
			let dataUrl = this.undoList.pop();
			this.redoList.push(this.canvas.toDataURL());
			let img = new Image();
			img.src = dataUrl;
			img.onload = () => {
				ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
				ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
			};
		} else {
			ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		}
	}

	redo() {
		let ctx = this.canvas.getContext('2d');
		if (this.redoList.length > 0) {
			let dataUrl = this.redoList.pop();
			this.undoList.push(dataUrl);
			let img = new Image();
			img.src = dataUrl;
			img.onload = () => {
				ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
				ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
			};
		}
	}
}

export default new CanvasState();
