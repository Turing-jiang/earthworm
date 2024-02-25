import { onMounted, ref } from "vue";
import confetti from "canvas-confetti";
import { isTheFirstDayOfLunarYear, isTheLastDayOfLunarYear } from '~/utils/bonus';
import { redFireworksEffect, schoolPrideEffect, normalEffect } from './confettiEffect';

export function useConfetti() {
  const confettiCanvasRef = ref<HTMLCanvasElement>();
  let myConfetti: ReturnType<typeof confetti.create>

  const initMyConfetti = () => {
    myConfetti = confetti.create(confettiCanvasRef.value, {
      resize: true,
      useWorker: true,
    });
  }

  const playConfetti = () => {
    if (isTheFirstDayOfLunarYear()) {
      redFireworksEffect(myConfetti)
      return
    }

    if (isTheLastDayOfLunarYear()) {
      schoolPrideEffect(myConfetti)
      return
    }
    
    normalEffect(myConfetti)
  };

  onMounted(() => {
    initMyConfetti()
  })

  return {
    confettiCanvasRef,
    playConfetti,
  };
}