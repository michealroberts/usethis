import { ref } from 'vue';

import { useIntervalFn } from '@vueuse/core';

const currentTime = ref(new Date())

export const useInternalClock = () => {
  useIntervalFn (() => {
    currentTime.value = new Date();
  }, 1000)

  return {
    currentTime
  }
}