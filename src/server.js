const http = require('http')
const { initI18n } = require('i18n-pro')
const cht = require('../i18n/cht.json')
const en = require('../i18n/en.json')
const jp = require('../i18n/jp.json')

const { setI18n, t: initT } = initI18n({
  namespace: 'server',
})

setI18n({
  langs: {
    cht,
    en,
    jp,
  },
})

http
  .createServer(function (req, res) {
    const regexp = /locale=(\w+)/
    const matchReg = req.url.match(regexp)
    const [, locale] = matchReg || []
    let t = initT.withLocale(locale)

    res.setHeader('Access-Control-Allow-Origin', '*')
    res.write(t('你好世界！'))
    res.end()
  })
  .listen(8080)
