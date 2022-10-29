import { isDark, isHexColorValid } from 'chyme';

export function getFaviconColors(color: string | undefined, background = false) {
	const validColor = color && isHexColorValid(color) ? color : '#00FF00';
	const dark = isDark(validColor, 0.35);
	const bg = background && dark;

	const bgColor = dark ? validColor : 'white';
	const ftColor = !dark ? '#002395' : bg ? 'white' : validColor;

	return { bg, bgColor, ftColor };
}

export function getFaviconBody(color: string | undefined, background = false, size = 'm') {
	const { bg, bgColor, ftColor } = getFaviconColors(color, background);

	if (size === 's') {
		return `${bg ? `<rect width="150" height="150" x="0" y="0" fill="${bgColor}"></rect>` : ''}
        <rect width="140" height="140" x="5" y="5" fill="none" stroke="${ftColor}" stroke-width="10"></rect>
        <text x="30" y="100" font-size="75" fill="${ftColor}" font-weight="900" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif">FC</text>`;
	} else {
		return `${bg ? `<rect width="450" height="150" x="0" y="0" fill="${bgColor}"></rect>` : ''}
        <g fill="${ftColor}" font-weight="600" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif">
            <text x="40" y="92.5" font-size="55">Fake Company</text>
            <text x="75" y="142" font-size="26" font-weight="400">everything out of the box</text>
        </g>
        <path d="M 60 135 L 15 135 L 15 15 L 435 15 L 435 135 L 380 135" stroke="${ftColor}" stroke-width="3" fill="none" />`;
	}
}
