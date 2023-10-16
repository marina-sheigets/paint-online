import Canvas from './components/Canvas';
import SettingBar from './components/SettingBar';
import ToolBar from './components/ToolBar';
import './styles/app.scss';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
function App() {
	console.log('window', window.location);
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
		</>
	);
}

export default App;
