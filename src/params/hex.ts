import type { ParamMatcher } from '@sveltejs/kit';
import { isHexColorValid } from 'chyme';

export const match: ParamMatcher = (param) => isHexColorValid(`#${param}`);
