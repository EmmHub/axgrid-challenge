import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Renders a navigation bar with links to trades form and trades results.
 *
 * @return {React.ReactElement} The rendered navigation bar.
 */
export function NavigationBar(): React.ReactElement {
	return (
		<nav role='navigation' className='flex-row flex-center py-5 '>
			<Link role='link' to='/trades/form' className='nav-link'>
				Trades Form
			</Link>
			<span className='nav-separator'>|</span>
			<Link role='link' to='/trades/results' className='nav-link'>
				Trades Results
			</Link>
		</nav>
	);
}
