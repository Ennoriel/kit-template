import { formDataToObject, isHexColorValid, isDark } from 'chyme';
import type { RequestHandler } from './$types';

type SearchParams = {
	color?: string;
	bg?: boolean;
};

export const GET: RequestHandler = ({ params, url }) => {
	const ttlInMin = 60 * 24 * 30;

	const query = formDataToObject<SearchParams>(url.searchParams);

	const color = query.color && isHexColorValid(query.color) ? query.color : '#002395';
	const dark = isDark(color, 0.35);
	const bg = query.bg && dark;
	const size = params.size;

	const bgColor = dark ? color : 'white';
	const ftColor = !dark ? '#002395' : bg ? 'white' : color;

	const sSvg = `
		<svg viewBox="0 0 150 150" height="150" width="150" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
			${bg && `<rect width="150" height="150" x="0" y="0" fill="${bgColor}"></rect>`}
			<rect width="140" height="140" x="5" y="5" fill="none" stroke="${ftColor}" stroke-width="10"></rect>
			<text x="30" y="100" font-size="75" fill="${ftColor}" font-weight="900" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif">FC</text>
		</svg>
	`;

	const mSvg = `
		<svg viewBox="0 0 450 150" height="150" width="450" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="user-select=none;">
			${bg && `<rect width="450" height="150" x="0" y="0" fill="${bgColor}"></rect>`}
			<g fill="${ftColor}" font-weight="600" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif">
				<text x="40" y="92.5" font-size="55">Fake Company</text>
				<text x="75" y="142" font-size="26" font-weight="400">everything out of the box</text>
			</g>
			<path d="M 60 135 L 15 135 L 15 15 L 435 15 L 435 135 L 380 135"
				stroke="${ftColor}" stroke-width="3" fill="none" />
		</svg>
	`;

	return new Response(String(size === 's' ? sSvg : mSvg), {
		headers: {
			'Cache-Control': `max-age=0, s-max-age=${ttlInMin * 60}`,
			'Content-Type': 'image/svg+xml'
		}
	});
};
