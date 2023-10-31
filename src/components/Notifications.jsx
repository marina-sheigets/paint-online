import { Alert } from 'react-bootstrap';
import '../styles/notifications.scss';
import canvasState from '../store/canvasState';
import { useObserver } from 'mobx-react-lite';
const Notifications = () => {
	return useObserver(() => (
		<div className='alerts-wrapper'>
			{canvasState.messages.map((message) => (
				<Alert className='alert' key={message} variant={'info'}>
					{message}
				</Alert>
			))}
		</div>
	));
};

export default Notifications;
