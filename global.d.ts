import { Translate, SetI18n } from 'i18n-pro'

declare global {
  interface Window {
    t: Translate
    setI18n: SetI18n
  }

  declare const t: Translate
  declare const setI18n: SetI18n
}
