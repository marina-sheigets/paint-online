import '../styles/toolbar.scss';
import { AiOutlineLine, AiOutlineSave } from 'react-icons/ai';
import { BsFillBrushFill, BsFillSquareFill, BsCircle, BsEraserFill } from 'react-icons/bs';
import { BiUndo, BiRedo } from 'react-icons/bi';
import toolState from '../store/toolState';
import Brush from '../tools/brush';
import canvasState from '../store/canvasState';
import Rect from '../tools/rect';
import Circle from '../tools/circle';
import Eraser from '../tools/eraser';
import Line from '../tools/line';
function ToolBar() {
	const changeColor = (e) => {
		toolState.setFillColor(e.target.value);
	};
	return (
		<div className='toolbar'>
			<button
				className='toolbar__btn'
				onClick={() =>
					toolState.setTool(
						new Brush(canvasState.canvas, canvasState.socket, canvasState.sessionId)
					)
				}>
				<BsFillBrushFill />
			</button>
			<button
				className='toolbar__btn'
				onClick={() =>
					toolState.setTool(
						new Rect(canvasState.canvas, canvasState.socket, canvasState.sessionId)
					)
				}>
				<BsFillSquareFill />
			</button>
			<button
				className='toolbar__btn '
				onClick={() =>
					toolState.setTool(
						new Circle(canvasState.canvas, canvasState.socket, canvasState.sessionId)
					)
				}>
				<BsCircle />
			</button>
			<button
				className='toolbar__btn'
				onClick={() =>
					toolState.setTool(
						new Eraser(canvasState.canvas, canvasState.socket, canvasState.sessionId)
					)
				}>
				<BsEraserFill />
			</button>
			<button
				className='toolbar__btn'
				onClick={() =>
					toolState.setTool(
						new Line(canvasState.canvas, canvasState.socket, canvasState.sessionId)
					)
				}>
				<AiOutlineLine />
			</button>
			<input type='color' onChange={changeColor} />
			<button className='toolbar__btn undo' onClick={() => canvasState.undo()}>
				<BiUndo />
			</button>
			<button className='toolbar__btn ' onClick={() => canvasState.redo()}>
				<BiRedo />
			</button>
			<button className='toolbar__btn brush'>
				<AiOutlineSave />
			</button>
		</div>
	);
}

export default ToolBar;
