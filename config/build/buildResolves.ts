import { ResolveOptions } from 'webpack'

export function buildResolves(): ResolveOptions {
	return {
		extensions: ['.ts', '.tsx', '.js']
	}
}