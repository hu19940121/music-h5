import Vue from 'vue'
import VueI18n from 'vue-i18n'

import Cookies from 'js-cookie'

Vue.use(VueI18n)

import zh from './config/zh'
import en from './config/en'
import uk from './config/uk'
console.log('en', en)
const messages = {
  en: {
    ...en
  },
  zh: {
    ...zh
  },
  uk: {
    ...uk
  }
}

export function getLanguage() {
  const chooseLanguage = Cookies.get('language')
  if (chooseLanguage) return chooseLanguage

  // if has not choose language
  const language = (navigator.language || navigator.browserLanguage).toLowerCase()
  const locales = Object.keys(messages)
  for (const locale of locales) {
    if (language.indexOf(locale) > -1) {
      return locale
    }
  }
  return 'en'
}

const i18n = new VueI18n({
  // set locale
  // options: en | zh | es
  locale: getLanguage(),
  messages
})
export default i18n
