import React, { useCallback, useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import './i18n'
import './index.css'

const bestProgramLang = ['JavaScript', 'Java', 'C', 'C++', 'Python', 'PHP'][
  Math.round(Math.random() * 5)
]

const date = new Date()

const locales = {
  zh: '简体中文',
  cht: '繁體中文',
  en: 'English',
  jp: '日本語',
}

function App() {
  const [show, setShow] = useState(false)
  const [locale, setLocale] = useState<string>()
  const [time, setTime] = useState(new Date())
  const [loading, setLoading] = useState(false)

  async function resolveI18n() {
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
    setI18n({
      langs: {
        [locale]: lang,
      },
      locale,
    })

    setShow(true)
    setLocale(locale)
  }

  function onSelectChange(e) {
    window.location.search = `?locale=${e.target.value}`
  }

  const request = useCallback(async (locale: string) => {
    setLoading(true)
    try {
      let req = await fetch(
        `${window.location.origin.replace('5173', '8080')}?locale=${locale}`,
      )
      let msg = await req.text()
      alert(t('收到服务的信息：{0}', msg))
    } catch (error) {
      alert(t('请求出错：{0}', error))
      console.error(error)
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    resolveI18n()
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
          <div className="title">{t('基础示例')}</div>
          <div>{t('简单的一段描述')}</div>
          <div>{t('{0}是世界上最好的语言？我不信', bestProgramLang)}</div>
          <div>
            {t(
              '这个男人叫{0}，意外获得了超能力，这个女人叫{1}，意外被{2}追杀，这个小孩叫{3}，意外遭遇了意外',
              '小帅',
              '小美',
              'FBI',
              '小白',
            )}
          </div>

          <div className="title">{t('格式化数字')}</div>
          <div>{t('GitHub全球开发者数量达到了{n0}', 83000000)}</div>

          <div className="title">{t('格式化金额')}</div>
          <div>{t('售价{c0}', 123456.78)}</div>

          <div className="title">{t('格式化日期')}</div>
          <div>{t('今天的日期是{d0}', date)}</div>

          <div className="title">{t('格式化时间')}</div>
          <div>{t('当前时间：{t0}', time)}</div>

          <div className="title">{t('格式化复数')}</div>
          <div>{t('我有{p0个苹果}', 0)}</div>
          <div>{t('我有{p0个苹果}', 1)}</div>
          <div>{t('我有{p0个苹果}', 5)}</div>

          <div className="title">{t('服务端响应')}</div>
          <span style={{ marginBottom: 20 }}>
            {t('说明：这里简单模拟服务端对客户端不同语言的响应')}
          </span>
          <br />
          {Object.entries(locales).map(([locale, name]) => {
            return (
              <>
                <button
                  style={{ margin: '5px 5px 0 0' }}
                  onClick={() => request(locale)}
                >
                  {t('客户端语言为：{0}', name)}
                </button>
              </>
            )
          })}
        </>
      )}
      <div className={loading ? 'loading' : ''}>
        {loading && <span>{t('加载中。。。')}</span>}
      </div>
    </>
  )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
