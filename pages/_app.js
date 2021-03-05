import "styles/globals.scss";

import Navbar from "components/Navbar/Navbar";
import Footer from "components/Footer/Footer";

// import CookieConsent from "components/CookieConsent/CookieConsent";

import moment from "moment";

import { AvailableLocalesContext, ColourContext } from "utils/context";

import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import PaletteSetter from "components/PaletteSetter/PaletteSetter";
import Background from "components/Background/Background";
import ContentWrapper from "components/ContentWrapper/ContentWrapper";

const App = ({ Component, pageProps }) => {
	const { locale, asPath } = useRouter();
	moment.locale(locale);

	const availableLocales = useState();
	const colourPalette = useState();

	const NavbarComponent = Component.Navbar || Navbar;
	const FooterComponent = Component.Footer || Footer;
	const [isOpen, setIsOpen] = useState(false);

	const [history, setHistory] = useState([]);
	useEffect(() => {
		if (history[0] != asPath) setHistory([asPath, ...history]);
	}, [asPath]);
	const handleBack = () => {
		setHistory(history.slice(1));
	};

	return (
		<AvailableLocalesContext.Provider value={availableLocales}>
			<ColourContext.Provider value={colourPalette}>
				<PaletteSetter>
					<Background />
					{/* <CookieConsent /> */}
					<NavbarComponent
						history={history}
						onBack={handleBack}
						isOpen={isOpen}
						setIsOpen={setIsOpen}
					/>
					<ContentWrapper navbarOpen={isOpen}>
						<Component {...pageProps} />
					</ContentWrapper>
					<FooterComponent />
				</PaletteSetter>
			</ColourContext.Provider>
		</AvailableLocalesContext.Provider>
	);
};

export default App;
