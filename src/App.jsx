import { useMemo } from 'react';
import Canvas from './components/Canvas';
import Notifications from './components/Notifications';
import SettingBar from './components/SettingBar';
import ToolBar from './components/ToolBar';
import './styles/app.scss';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
function App() {
	let newSessionId = useMemo(() => `f${(+new Date()).toString(16)}`, []);
	return (
		<BrowserRouter>
			<div className='app'>
				<Routes>
					<Route path='/:id' element={<Content />}></Route>
				</Routes>
				{window.location.pathname === '/' && <Navigate to={newSessionId} />}
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
