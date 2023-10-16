import toolState from '../store/toolState';

function SettingBar() {
	return (
		<div className='setting-bar'>
			<label htmlFor='line-width'>Line width</label>
			<input
				id='line-width'
				type='number'
				defaultValue={1}
				min={1}
				max={30}
				onChange={(e) => toolState.setLineWidth(e.target.value)}
			/>
			<label htmlFor='stroke-color'>Stroke color</label>
			<input
				id='stroke-color'
				type='color'
				onChange={(e) => toolState.setStrokeColor(e.target.value)}
			/>
		</div>
	);
}

export default SettingBar;
