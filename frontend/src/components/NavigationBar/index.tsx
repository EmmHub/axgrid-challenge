import { Link } from 'react-router-dom';

export function NavigationBar() {
	return (
		<nav className='flex-row flex-center py-5 '>
			<Link to='/trades/form' className='nav-link'>
				Trades Form
			</Link>
			<span className='nav-separator'>|</span>
			<Link to='/trades/results' className='nav-link'>
				Trades Results
			</Link>
		</nav>
	);
}
