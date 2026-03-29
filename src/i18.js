import { createI18n } from 'vue-i18n'
import en from '@/locales/en.json'
import es from '@/locales/es.json'
import it from '@/locales/it.json'
import chs from '@/locales/chs.json'

const i18n = createI18n({
    legacy: false,
    locale: 'it',
    fallbackLocale: 'en',
    messages: {
        en,
        es,
        it,
        chs,
    },
})

export default i18n