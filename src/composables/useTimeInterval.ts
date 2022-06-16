import { computed, readonly, ref } from 'vue'

import { useNow } from '@vueuse/core'

import { addHours } from 'date-fns'

import type { Interval } from 'date-fns'

export interface UseTimeIntervalOptions {
  /**
   * 
   * 
   * 
   */
  control?: 'absolute' | 'relative'
  /**
   * 
   * Starting Interval Relative to Now
   * 
   */
  start?: number,
  /**
   * 
   * Ending Interval Relative to Now
   * 
   */
  end?: number
}

const { now, pause, resume } = useNow({ controls: true })

/**
 * 
 * 
 * 
 * @param options 
 * @returns 
 */
export const useTimeInterval = (options?: UseTimeIntervalOptions) => {
  const {
    control = 'absolute',
    start = -6,
    end = 6
  } = options || {}

  const mode = ref(control)

  const interval = ref({
    start,
    end,
  })

  const setInterval = (start: number, end: number) => {
    interval.value = {
      start,
      end,
    }
  }

  const datetime = ref(new Date())

  const isRelative = computed(() => {
    return mode.value === 'relative'
  })

  const isAbsolute = computed(() => {
    return mode.value === 'absolute'
  })

  const timeInterval = computed<Interval>(() => {
    if (isRelative.value) {
      return {
        start: addHours(now.value, interval.value.start),
        end: addHours(now.value, interval.value.end)
      }
    }

    return {
      start: addHours(datetime.value, interval.value.start),
      end: addHours(datetime.value, interval.value.end)
    }
  })

  return {
    mode,
    toggleMode: () => {
      mode.value = mode.value === 'relative' ? 'absolute' : 'relative'
    },
    isRelative,
    isAbsolute,
    datetime,
    now,
    interval: readonly(interval),
    setInterval,
    timeInterval,
    pause,
    resume
  }
}

export type UseTimeIntervalReturn = ReturnType<typeof useTimeInterval>