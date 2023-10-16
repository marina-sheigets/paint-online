import { observer } from 'mobx-react-lite';
import '../styles/canvas.scss';
import { useEffect, useRef } from 'react';
import canvasState from '../store/canvasState';
import toolState from '../store/toolState';
import Brush from '../tools/brush';
import Modal from './Modal.jsx';
const Canvas = observer(() => {
	const canvasRef = useRef();
	useEffect(() => {
		canvasState.setCanvas(canvasRef.current);
		toolState.setTool(new Brush(canvasRef.current));
	}, []);

	const mouseDownHandler = () => {
		canvasState.pushToUndo(canvasRef.current.toDataURL());
	};
	return (
		<div className='canvas'>
			<Modal />
			<canvas
				onMouseDown={mouseDownHandler}
				ref={canvasRef}
				width={600}
				height={400}></canvas>
		</div>
	);
});

export default Canvas;
