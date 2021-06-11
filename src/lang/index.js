/**
 * App Language Provider
 * Add more locales here
 */
import { addLocaleData } from 'react-intl';

import enLang from './entries/en-US';
import deLang from './entries/DE-CH';

const AppLocale = {
   en: enLang,
   de: deLang,
};

addLocaleData(AppLocale.en.data);
addLocaleData(AppLocale.de.data);

export default AppLocale;