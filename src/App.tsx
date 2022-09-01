import React, { useCallback, useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import { i18n, setI18N } from 'i18n-pro'
import './index.css'

setI18N({
  formatNumber({ locale, payload }) {
    let res = payload as string
    switch (locale) {
      case 'en':
        if (typeof payload === 'number') {
          if (payload > 1000000) {
            res = payload / 1000000 + ' Million'
          }
        }
        break
      case 'zh':
      case 'cht':
      case 'JP':
      default:
        if (typeof payload === 'number') {
          if (payload > 10000000) {
            res = ` ${payload / 10000000} ${i18n('千万')}`
          }
        }
        break
    }

    return res as string
  },
  formatCurrency({ locale, payload }) {
    let res = (payload + '').replace(/(?!\b)(?=(\d{3})+[\b.])(?<!\.\d+)/g, ',')
    switch (locale) {
      case 'en':
        res = '$' + res
        break
      case 'jp':
        res = 'JPY￥' + res
        break
      case 'zh':
      case 'cht':
      default:
        res = 'CNY￥' + res
        break
    }
    return res
  },
  formatDate({ locale, payload }) {
    const date = payload as Date
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()

    let res = ''

    switch (locale) {
      case 'en':
        res = `${day}/${month}/${year}`
        break
      case 'zh':
      case 'cht':
      case 'jp':
      default:
        res = `${year}${i18n('年')}${month}${i18n('月')}${day}${i18n('日')}`
        break
    }

    return res
  },
  formatTime({ locale, payload }) {
    const date = payload as Date
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    let res = ''

    switch (locale) {
      case 'en':
        res = `${day}-${month}-${year} ${hour}:${minute}:${second}`
        break
      case 'zh':
      case 'cht':
      case 'jp':
      default:
        res = `${year}/${month}/${day} ${hour}:${minute}:${second}`
        break
    }

    return res
  },
  formatPlural({ locale, payload, text, keywords }) {
    let res = text
    switch (locale) {
      case 'en':
        switch (keywords) {
          case 'apples':
            if (payload == 0) {
              res = 'no apple'
            } else if (payload == 1) {
              res = 'one apple'
            } else {
              res = `${payload} apples`
            }
            break
        }
        break
      default:
        res = text
        break
    }

    return res
  },
})

const bestProgramLang =   ['JavaScript', 'Java', 'C', 'C++', 'Python', 'PHP'][
  Math.round(Math.random() * 5)
]

const date = new Date()

function App() {
  const [show, setShow] = useState(false)
  const [locale, setLocale] = useState<string>()
  const [time, setTime] = useState(new Date())
  const locales = {
    zh: i18n('简体中文'),
    cht: i18n('繁体中文'),
    en: i18n('英文'),
    jp: i18n('日文'),
  }

  async function resolveI18N() {
    const params = new URLSearchParams(
      new URLSearchParams(window.location.search.slice(1)),
    )
    let locale = params.get('locale') || 'zh'
    let lang = {}
    let req = await fetch(`../i18n/${locale}.json`)
    try {
      lang = await req.json()
    } catch (error) {
      console.error(error)
    }
    setI18N({
      langs:{
        [locale]:lang
      },
      locale,
    })

    setShow(true)
    setLocale(locale)
  }

  function onSelectChange(e) {
    window.location.search = `?locale=${e.target.value}`
  }

  const request = useCallback(async(locale:string)=>{
     let req = await fetch(`${window.location.origin.replace('5173','8080')}?locale=${locale}`)
     try {
      let msg = await req.text()
      alert(i18n('收到服务的信息：{0}', msg))
     } catch (error) {
      console.error(error)
     }            
  }, [])

  useEffect(() => {
    resolveI18N()
    const tag = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => {
      clearInterval(tag)
    }
  }, [])

  return (
    <>
      {show && (
        <>
          <select value={locale} onChange={onSelectChange}>
            {Object.entries(locales).map(([locale, name]) => {
              return (
                <option value={locale} key={locale}>
                  {name}
                </option>
              )
            })}
          </select>
          <div className="title">{i18n('基础示例')}</div>
          <div>{i18n('简单的一段描述')}</div>
          <div>{i18n('{0}是世界上最好的语言？我不信', bestProgramLang)}</div>
          <div>
            {i18n(
              '这个男人叫{0}，意外获得了超能力，这个女人叫{1}，意外被{2}追杀，这个小孩叫{3}，意外遭遇了意外',
              '小帅',
              '小美',
              'FBI',
              '小白',
            )}
          </div>

          <div className="title">{i18n('格式化数字')}</div>
          <div>{i18n('GitHub全球开发者数量达到了{n0}', 83000000)}</div>

          <div className="title">{i18n('格式化金额')}</div>
          <div>{i18n('售价{c0}', 123456.78)}</div>

          <div className="title">{i18n('格式化日期')}</div>
          <div>{i18n('今天的日期是{d0}', date)}</div>

          <div className="title">{i18n('格式化时间')}</div>
          <div>{i18n('当前时间：{t0}', time)}</div>

          <div className="title">{i18n('格式化复数')}</div>
          <div>{i18n('我有{p0个苹果}', 0)}</div>
          <div>{i18n('我有{p0个苹果}', 1)}</div>
          <div>{i18n('我有{p0个苹果}', 5)}</div>

          <div className="title">{i18n('服务端响应')}</div>
          <span style={{marginBottom:20}}>{i18n('说明：这里简单模拟服务端对客户端不同语言的响应')}</span><br/>
          {Object.entries(locales).map(([locale,name])=>{

            return (
              <>
                <button 
                  onClick={()=>request(locale)} 
                >
                  {i18n('客户端语言为：{0}', name)}
                </button>
                &nbsp;
              </>
            )
          })}
        </>
      )}
    </>
  )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
