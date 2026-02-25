// React
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Fait que à chaque fois que l'on change de page, ça nous ramène proprement tout en haut de la page
export default function ScrollToTop() {
	const { pathname } = useLocation();

	useEffect(() => {
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: 'instant'
		});
	}, [pathname]);

	return null;
}
