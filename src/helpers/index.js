import AppConfig from "constants/AppConfig";
import Moment from 'moment';

/**
 * Helpers Functions
 */

// Function to Truncate string
export function textTruncate(str, length, ending) {
	if (length == null) {
		length = 100;
	}
	if (ending == null) {
		ending = '...';
	}
	if (str.length > length) {
		return str.substring(0, length - ending.length) + ending;
	} else {
		return str;
	}
}

// function to convert hex color to rgba
export function hexToRgbA(hex, alpha) {
	var c;
	if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
		c = hex.substring(1).split('');
		if (c.length === 3) {
			c = [c[0], c[0], c[1], c[1], c[2], c[2]];
		}
		c = '0x' + c.join('');
		return 'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + ',' + alpha + ')';
	}
	throw new Error('Bad Hex');
}

export function getLink(url) {
	if (url && !url.includes("http://") && !url.includes("https://")) {
		return `${AppConfig.SERVER_HOST}${url}`;
	}
	return url;
}
export function strisnull(str) {
	if (!str || str.toLowerCase() === "null" || str.toLowerCase() === "(null)") {
		return true;
	}
	return false;
}
export function date2str(date) {
	Moment.locale('en');
	return Moment(date).format('D MMM yyyy')
}