import { useEffect, useRef, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import canvasState from '../store/canvasState';
import { useParams } from 'react-router-dom';
import Brush from '../tools/brush';
import toolState from '../store/toolState';
import PropTypes from 'prop-types';
import Rect from '../tools/rect';
import Circle from '../tools/circle';
import { Button } from 'react-bootstrap';
import Eraser from '../tools/eraser';
import Line from '../tools/line';

function ModalWindow({ canvasRef }) {
	const { id } = useParams();
	const usernameRef = useRef();
	const [isOpen, setIsOpen] = useState(true);
	const connectionHandler = () => {
		setIsOpen(false);
		canvasState.setUsername(usernameRef.current.value);
	};

	useEffect(() => {
		if (canvasState.username) {
			const socket = new WebSocket('ws://localhost:5000/');
			canvasState.setSocket(socket);
			canvasState.setSessionId(id);
			toolState.setTool(new Brush(canvasRef.current, socket, id));
			socket.onopen = () => {
				socket.send(
					JSON.stringify({
						id,
						username: canvasState.username,
						method: 'connection',
					})
				);
			};

			socket.onmessage = (event) => {
				let msg = JSON.parse(event.data);
				if (msg.method === 'connection') {
					canvasState.addMessage(`User ${msg.username} was connected`);

					setTimeout(() => {
						canvasState.deleteMessage();
					}, 3000);
				} else {
					drawHandler(msg);
				}
			};
		}
	}, [canvasState.username, id]);

	const drawHandler = (msg) => {
		const figure = msg.figure;
		const ctx = canvasRef.current.getContext('2d');
		switch (figure.type) {
			case 'brush':
				Brush.draw(
					ctx,
					figure.x,
					figure.y,
					figure.color,
					figure.strokeColor,
					figure.lineWidth
				);
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
	return (
		<>
			{isOpen && (
				<div className='modal show' style={{ display: 'block', position: 'absolute' }}>
					<Modal.Dialog>
						<Modal.Header closeButton>
							<Modal.Title>Enter your name</Modal.Title>
						</Modal.Header>

						<Modal.Body>
							<input ref={usernameRef} type='text' />
						</Modal.Body>

						<Modal.Footer>
							<Button variant='secondary' onClick={() => connectionHandler()}>
								Come in
							</Button>
						</Modal.Footer>
					</Modal.Dialog>
				</div>
			)}
		</>
	);
}

ModalWindow.propTypes = {
	canvasRef: PropTypes.oneOfType([PropTypes.func, PropTypes.shape({ current: PropTypes.any })]),
};
export default ModalWindow;
