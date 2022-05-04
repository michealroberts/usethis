import { describe, expect, it} from 'vitest'

import { useInternationalNumberFormat } from '../'

// Mock the native window.navigator.languages API:
const setupNavigatorLanguages = (langauges: string[]) => {
  const navigator = { 
    languages: langauges
  }

  return Object.defineProperty(window, 'navigator', {
    value: navigator,
    writable: true
  });
}

describe('useInternationalNumberFormat', () => {
  it('should be defined', () => {
    expect(useInternationalNumberFormat).toBeDefined()
  })

  it('should return the correct formatted number for fr-FR', () => {
    setupNavigatorLanguages(['fr-FR'])
    const {formattedNumber } = useInternationalNumberFormat(123456789)
    expect(formattedNumber.value).toBe('123 456 789')
  })

  it('should return the correct formatted number for en-US', () => {
    setupNavigatorLanguages(['en-US'])
    const {formattedNumber } = useInternationalNumberFormat(123456789)
    expect(formattedNumber.value).toBe('123,456,789')
  })

  it('should return the correct formatted number for en-GB', () => {
    setupNavigatorLanguages(['en-GB'])
    const {formattedNumber } = useInternationalNumberFormat(123456789)
    expect(formattedNumber.value).toBe('123,456,789')
  })

  it('should be reactivity bound to the number ref', () => {
    setupNavigatorLanguages(['en-US'])
    const { number, formattedNumber } = useInternationalNumberFormat(0)
    expect(formattedNumber.value).toBe('0')

    number.value = 781234
    expect(formattedNumber.value).toBe('781,234')
  })

  it('should be able to handle euro currency', () => {
    setupNavigatorLanguages(['de-DE'])
    const { formattedNumber } = useInternationalNumberFormat(56.78, { style: 'currency', currency: 'EUR' })
    expect(formattedNumber.value).toBe('56,78 €')
  })

  it('should be able to handle yen currency', () => {
    setupNavigatorLanguages(['ja-JP'])
    const { formattedNumber } = useInternationalNumberFormat(56.78, { style: 'currency', currency: 'JPY' })
    expect(formattedNumber.value).toBe('￥57')
  })

  it('should return the correct formatted number for fr-FR to 3 significant digits', () => {
    setupNavigatorLanguages(['fr-FR'])
    const {formattedNumber } = useInternationalNumberFormat(123456789, { maximumSignificantDigits: 3 })
    expect(formattedNumber.value).toBe('123 000 000')
  })

  it('should return the correct formatted number for fr-FR to 3 significant digits', () => {
    setupNavigatorLanguages(['fr-FR'])
    const {formattedNumber } = useInternationalNumberFormat(123456789, { maximumSignificantDigits: 6 })
    expect(formattedNumber.value).toBe('123 457 000')
  })

  it('should return the correct formatted number for fr-FR in units of kilogram', () => {
    setupNavigatorLanguages(['fr-FR'])
    const {formattedNumber } = useInternationalNumberFormat(123456789, { unit: 'kilogram' })
    expect(formattedNumber.value).toBe('123 456 789')
  })
})