import { configure, getLogger } from 'log4js';

configure({
	appenders: { diff: { type: 'file', filename: 'diff.log' } },
	categories: { default: { appenders: ['diff'], level: 'info' } }
});

export const diffLogger = getLogger('diff');