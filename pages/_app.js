import "styles/globals.scss";

import Navbar from "components/Navbar/Navbar";
import Footer from "components/Footer/Footer";

// import CookieConsent from "components/CookieConsent/CookieConsent";

import moment from "moment";

import { AvailableLocalesContext, ColourContext } from "utils/context";

import { useRouter } from "next/router";
import { useState } from "react";
import PaletteSetter from "components/PaletteSetter/PaletteSetter";
import Background from "components/Background/Background";

const App = ({ Component, pageProps }) => {
	const { locale } = useRouter();
	const availableLocales = useState();
	const colourPalette = useState();
	moment.locale(locale);
	const NavbarComponent = Component.Navbar || Navbar;
	const FooterComponent = Component.Footer || Footer;

	return (
		<AvailableLocalesContext.Provider value={availableLocales}>
			<ColourContext.Provider value={colourPalette}>
				<PaletteSetter>
					<Background />
					{/* <CookieConsent /> */}
					<NavbarComponent />
					<Component {...pageProps} />
					<FooterComponent />
				</PaletteSetter>
			</ColourContext.Provider>
		</AvailableLocalesContext.Provider>
	);
};

export default App;
