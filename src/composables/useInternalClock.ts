import { ref } from 'vue';

const currentTime = ref(new Date())

export const useInternalClock = () => {
  setInterval(() => {
    currentTime.value = new Date();
  }, 1000);

  return {
    currentTime
  }
}