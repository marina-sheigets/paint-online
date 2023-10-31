import { observer } from 'mobx-react-lite';
import '../styles/canvas.scss';
import { useEffect, useRef } from 'react';
import canvasState from '../store/canvasState';
import toolState from '../store/toolState';
import Brush from '../tools/brush';
import Modal from './Modal.jsx';
import axios from 'axios';
import { useParams } from 'react-router-dom';
const Canvas = observer(() => {
	const params = useParams();
	const canvasRef = useRef();
	useEffect(() => {
		canvasState.setCanvas(canvasRef.current);
		toolState.setTool(new Brush(canvasRef.current));
		axios.get(`https://paint-server-tau.vercel.app/image?id=${params.id}`).then((res) => {
			const img = new Image();
			const ctx = canvasRef.current.getContext('2d');
			img.src = res.data;
			img.onload = () => {
				ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
				ctx.drawImage(img, 0, 0, canvasRef.current.width, canvasRef.current.height);
			};
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const mouseDownHandler = () => {
		canvasState.pushToUndo(canvasRef.current.toDataURL());
	};

	const handleSendCurrentImg = () => {
		axios.post(`https://paint-server-tau.vercel.app/image?id=${params.id}`, {
			img: canvasRef.current.toDataURL(),
		});
	};
	return (
		<div className='canvas'>
			<Modal canvasRef={canvasRef} />
			<canvas
				onMouseDown={mouseDownHandler}
				onMouseUp={handleSendCurrentImg}
				ref={canvasRef}
				width={600}
				height={400}></canvas>
		</div>
	);
});

export default Canvas;
