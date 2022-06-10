import { computed, ref } from "vue"

export interface UseDegreeOptions {
  format: 'DMS' | 'HMS'
}

/**
 *
 * convertDegreeToHMS()
 *
 * @param degree (of type number)
 * @returns the hours, minutes and seconds components of a degree value.
 */
 export const convertDegreeToHMS = (degree: number): { hrs: number; min: number; sec: number } => {
  degree = Math.abs(degree)

  const deg = degree / 15

  const hrs = Math.floor(deg)

  const min = Math.floor((deg - hrs) * 60)

  const sec = Math.round((deg - hrs - min / 60) * 3600 * 1000) / 1000

  return {
    hrs: hrs,
    min: min,
    sec: sec
  }
}

export const useDegreeFormat = (initialDegree: number) => {
  const degree = ref(initialDegree)

  const hms = computed(() => convertDegreeToHMS(degree.value))

  const setDegree = (newDegree: number) => {
    degree.value = newDegree
  }

  return {
    degree,
    setDegree,
    degreeHMSString: computed(() => {
      return `${hms.value.hrs}h ${hms.value.min}m ${hms.value.sec}s`
    })
  }
}