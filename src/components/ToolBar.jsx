import '../styles/toolbar.scss';
import { AiOutlineLine, AiOutlineSave } from 'react-icons/ai';
import { BsFillBrushFill, BsFillSquareFill, BsCircle, BsEraserFill } from 'react-icons/bs';
import { BiUndo, BiRedo } from 'react-icons/bi';
function ToolBar() {
	return (
		<div className='toolbar'>
			<button className='toolbar__btn'>
				<BsFillBrushFill />
			</button>
			<button className='toolbar__btn'>
				<BsFillSquareFill />
			</button>
			<button className='toolbar__btn '>
				<BsCircle />
			</button>
			<button className='toolbar__btn'>
				<BsEraserFill />
			</button>
			<button className='toolbar__btn'>
				<AiOutlineLine />
			</button>
			<input type='color' />
			<button className='toolbar__btn undo'>
				<BiUndo />
			</button>
			<button className='toolbar__btn '>
				<BiRedo />
			</button>
			<button className='toolbar__btn brush'>
				<AiOutlineSave />
			</button>
		</div>
	);
}

export default ToolBar;
