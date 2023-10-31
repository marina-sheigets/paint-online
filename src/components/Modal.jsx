import { useEffect, useRef, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import canvasState from '../store/canvasState';
import { useParams } from 'react-router-dom';
import Brush from '../tools/brush';
import toolState from '../store/toolState';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { drawFigure } from '../utils/drawFigure';

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
			const socket = new WebSocket('wss://paint-server-tau.vercel.app');
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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [canvasState.username, id]);

	const drawHandler = (msg) => {
		const figure = msg.figure;
		const ctx = canvasRef.current.getContext('2d');
		drawFigure(figure, ctx);
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
