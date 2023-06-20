export const buildSVGLoader = () => ({
  test: /\.svg$/i,
  issuer: /\.[jt]sx?$/,
  use: ['@svgr/webpack'],
  exclude: /node_modules/,
})
