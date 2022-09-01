const http = require('http')
const { setI18N, withI18N } = require('i18n-pro')
const cht = require('../i18n/cht.json')
const en = require('../i18n/en.json')
const jp = require('../i18n/jp.json')

setI18N({
  langs:{
    cht,
    en,
    jp
  }
})

http
  .createServer(function(req, res) {
    const regexp = /locale=(\w+)/
    const matchReg = req.url.match(regexp)
    const [,locale] = (matchReg || [])
    const { i18n } = withI18N({locale})
    
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.write(i18n('你好世界！'))
    res.end()
  })
  .listen(8080)
