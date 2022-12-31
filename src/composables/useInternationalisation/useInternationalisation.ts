import { Ref } from 'vue'

import { RFC5646_LANGUAGE_TAGS } from './rfc5646'

interface UseInternationalisationParams {
  /**
   * 
   * A reactive Ref that contains the language string to use for internationalisation.
   * 
   */
  language: Ref<string | undefined>
}

interface LookUpTextRecord {
  [key: string]: Record<string, string> | undefined
}

type UseInternationalisation18n = (displayText: string, lookupTextRecord: LookUpTextRecord, params: UseInternationalisationParams) => void

export const isRFC5646LanguageString = (language: string): boolean => {
  return RFC5646_LANGUAGE_TAGS[language] !== undefined
}

/**
 * 
 * useInternationalisation18n()
 * 
 * @param displayText 
 * @param params 
 */
export const useInternationalisation18n: UseInternationalisation18n = function (displayText, lookupTextRecord, params) {
  const { language } = params

  // Assume a defualt language of english if none is provided:
  if (language.value === undefined) {
    language.value = 'en-US'
  }

  // If the language is not a valid RFC5646 language string, assume english:
  if (!isRFC5646LanguageString(language.value)) {
    language.value = 'en-US'
  }

  // Lookup the display text for the language provider in the lookupTextRecord:
  const lookupText = lookupTextRecord[language.value]

  // If the lookup text is not undefined, then use it:
  if (lookupText !== undefined) {
    displayText = lookupText[displayText] || displayText
  }

  return displayText
}