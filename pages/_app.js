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
import { ConfigProvider } from "utils/hooks/useConfig";

const App = ({ Component, pageProps }) => {
	const { locale, asPath } = useRouter();
	moment.locale(locale);

	const availableLocales = useState();
	const colourPalette = useState();

	const NavbarComponent = Component.Navbar || Navbar;
	const FooterComponent = Component.Footer || Footer;
	const [isOpen, setIsOpen] = useState(false);

	const [parentPage, setParent] = useState([]);
	useEffect(() => {
		const parent = asPath.match(/\/([a-zA-z\-0-9\_]+)\//g)?.pop();

		setParent(parent || "");
	}, [asPath]);

	return (
		<AvailableLocalesContext.Provider value={availableLocales}>
			<ColourContext.Provider value={colourPalette}>
				<ConfigProvider>
					<PaletteSetter>
						<Background />
						<CookieConsent />
						<NavbarComponent
							parent={parentPage}
							isOpen={isOpen}
							setIsOpen={setIsOpen}
						/>
						<ContentWrapper navbarOpen={isOpen}>
							<Component {...pageProps} />
						</ContentWrapper>
						<FooterComponent />
					</PaletteSetter>
				</ConfigProvider>
			</ColourContext.Provider>
		</AvailableLocalesContext.Provider>
	);
};

export default App;
