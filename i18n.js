import * as Localization from "expo-localization"
import { I18n } from "i18n-js"
import { translations } from "./translations/translations"

const i18n = new I18n(translations)
i18n.locale = Localization.locale
i18n.enableFallback = true

export const t = (translationKey) => i18n.t(translationKey)
