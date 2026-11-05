import { useLayoutEffect } from "react";
import { useLocation, useNavigationType } from "react-router";

// Nova stran se odpre na vrhu, sicer bi ostala pri poziciji prejšnje strani.
// Pri gumbu Nazaj (POP) položaj pusti brskalniku, da se otrok vrne, kjer je bil.
export function useScrollToTop() {
	const { pathname } = useLocation();
	const navigationType = useNavigationType();

	// useLayoutEffect: premik se zgodi pred izrisom, zato stran ne poskoči
	useLayoutEffect(() => {
		if (navigationType !== "POP") window.scrollTo(0, 0);
	}, [pathname, navigationType]);
}
