// eslint-disable-next-line @typescript-eslint/no-var-requires
const glob = require('glob')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const pages = {}

glob.sync('./src/pages/**/main.ts').forEach(entry => {
  const chunk = entry.match(/\.\/src\/pages\/(.*)\/main\.ts/)[1]
  if (chunk) {
    pages[chunk] = {
      entry,
      chunk: ['chunk-vendors', 'chunk-common', chunk]
    }
  }
})

module.exports = {
  pages
}
