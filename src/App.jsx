import Canvas from './components/Canvas';
import Notifications from './components/Notifications';
import SettingBar from './components/SettingBar';
import ToolBar from './components/ToolBar';
import './styles/app.scss';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
function App() {
	return (
		<BrowserRouter>
			<div className='app'>
				<Routes>
					<Route path='/:id' element={<Content />}></Route>
				</Routes>
				{window.location.pathname === '/' && (
					<Navigate to={`f${(+new Date()).toString(16)}`} />
				)}
			</div>
		</BrowserRouter>
	);
}

function Content() {
	return (
		<>
			<ToolBar />
			<SettingBar />
			<Canvas />
			<Notifications />
		</>
	);
}

export default App;
