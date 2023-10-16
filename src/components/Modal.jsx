import { useEffect, useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import canvasState from '../store/canvasState';
import { useParams } from 'react-router-dom';

function ModalWindow() {
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
				console.log(event.data);
			};
		}
	}, [canvasState.username, id]);
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

export default ModalWindow;
