import { describe, expect, it, vi } from 'vitest'

import { useTimeInterval } from '../'

describe('useTimeInterval', () => {
  it('should be defined', () => {
    expect(useTimeInterval).toBeDefined()
  })

  it('should be in the correct default timing mode', () => {
    const {
      mode,
    } = useTimeInterval({ control: 'relative' })
    expect(mode.value).toBe('relative')
  })

  it('should be in the correct default timing mode after one toggle', () => {
    const {
      mode,
      toggleMode,
    } = useTimeInterval({ control: 'relative' })
    toggleMode()
    expect(mode.value).toBe('absolute')
  })

  it('should have the correct default interval', () => {
    const {
      mode,
      interval
    } = useTimeInterval({ start: -6, end: 6 })
    expect(mode.value).toBe('absolute')
    expect(interval.value).toMatchObject({ start: -6, end: 6 })
  })

  it('should have the correct default timing mode and correct default interval', () => {
    const {
      mode,
      interval
    } = useTimeInterval({ control: 'relative', start: -12, end: 12 })
    expect(mode.value).toBe('relative')
    expect(interval.value).toMatchObject({ start: -12, end: 12 })
  })
})