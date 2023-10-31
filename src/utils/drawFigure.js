import Brush from '../tools/brush';
import Circle from '../tools/circle';
import Eraser from '../tools/eraser';
import Line from '../tools/line';
import Rect from '../tools/rect';

export const drawFigure = (figure, ctx) => {
	switch (figure.type) {
		case 'brush':
			Brush.draw(ctx, figure.x, figure.y, figure.color, figure.strokeColor, figure.lineWidth);
			break;
		case 'rect':
			Rect.staticDraw(
				ctx,
				figure.x,
				figure.y,
				figure.width,
				figure.height,
				figure.color,
				figure.strokeColor,
				figure.lineWidth
			);
			break;
		case 'circle':
			Circle.staticDraw(
				ctx,
				figure.x,
				figure.y,
				figure.radius,
				figure.color,
				figure.strokeColor,
				figure.lineWidth
			);
			break;
		case 'eraser':
			Eraser.draw(
				ctx,
				figure.x,
				figure.y,
				figure.color,
				figure.strokeColor,
				figure.lineWidth
			);
			break;
		case 'line':
			Line.staticDraw(
				ctx,
				figure.startX,
				figure.startY,
				figure.x,
				figure.y,
				figure.color,
				figure.strokeColor,
				figure.lineWidth
			);
			break;
		case 'finish':
			ctx.beginPath();
			break;
	}
};
