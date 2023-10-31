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
import { useState } from 'react';
function ToolBar() {
	const TOOLS = {
		left: [
			{
				id: 0,
				handleClick: () => {
					toolState.setTool(
						new Brush(canvasState.canvas, canvasState.socket, canvasState.sessionId)
					);
				},
				Icon: <BsFillBrushFill />,
			},
			{
				id: 1,
				handleClick: () => {
					toolState.setTool(
						new Rect(canvasState.canvas, canvasState.socket, canvasState.sessionId)
					);
				},
				Icon: <BsFillSquareFill />,
			},
			{
				id: 2,
				handleClick: () => {
					toolState.setTool(
						new Circle(canvasState.canvas, canvasState.socket, canvasState.sessionId)
					);
				},
				Icon: <BsCircle />,
			},
			{
				id: 3,
				handleClick: () => {
					toolState.setTool(
						new Eraser(canvasState.canvas, canvasState.socket, canvasState.sessionId)
					);
				},
				Icon: <BsEraserFill />,
			},
			{
				id: 4,
				handleClick: () => {
					toolState.setTool(
						new Line(canvasState.canvas, canvasState.socket, canvasState.sessionId)
					);
				},
				Icon: <AiOutlineLine />,
			},
		],

		right: [
			{
				className: 'toolbar__btn undo',
				id: 5,
				handleClick: () => canvasState.undo(),
				Icon: <BiUndo />,
			},
			{
				className: 'toolbar__btn',
				id: 6,
				handleClick: () => canvasState.redo(),
				Icon: <BiRedo />,
			},
			{
				className: 'toolbar__btn brush',
				id: 7,
				handleClick: () => download(),
				Icon: <AiOutlineSave />,
			},
		],
	};

	const [selectedToolId, setSelectedToolId] = useState(0);
	const changeColor = (e) => {
		toolState.setFillColor(e.target.value);
	};

	const download = () => {
		const dataUrl = canvasState.canvas.toDataURL();
		const a = document.createElement('a');
		a.href = dataUrl;
		a.download = canvasState.sessionId + '.jpg';
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
	};
	return (
		<div className='toolbar'>
			{TOOLS.left.map((tool) => (
				<button
					key={tool.id}
					className={`toolbar__btn ${selectedToolId === tool.id && 'selected'}`}
					onClick={() => {
						tool.handleClick();
						setSelectedToolId(tool.id);
					}}>
					{tool.Icon}
				</button>
			))}
			<input type='color' onChange={changeColor} />
			{TOOLS.right.map((tool) => (
				<button
					key={tool.id}
					className={tool.className}
					onClick={() => {
						tool.handleClick();
					}}>
					{tool.Icon}
				</button>
			))}
		</div>
	);
}

export default ToolBar;
