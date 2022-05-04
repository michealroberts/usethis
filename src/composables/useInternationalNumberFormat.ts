import { computed, ref } from 'vue'

import { usePreferredLanguages } from '@vueuse/core'

/**
 * 
 * Reactive International Number Formatting
 * 
 * @param number, e.g., 189.99
 * @param locale, e.g., 'en-US', 'en-GB' etc
 * @param options e.g., { style: 'currency', currency: 'EUR' }
 * @returns the number formatted according to the locale's conventions
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
 */
export const useInternationalNumberFormat = (
  number: number,
  options?: Intl.NumberFormatOptions
) => {
  const n = ref(number)

  const languages = usePreferredLanguages()

  const l = computed(() => {
    return Intl.NumberFormat.supportedLocalesOf(languages.value.map(l => l.toString()))
  })

  return {
    number: n,
    locale: l,
    formattedNumber: computed(() => { 
      return new Intl.NumberFormat(l.value, options).format(n.value) 
    }),
  }
}

export default useInternationalNumberFormat

export type useInternationalNumberFormatReturn = ReturnType<typeof useInternationalNumberFormat>