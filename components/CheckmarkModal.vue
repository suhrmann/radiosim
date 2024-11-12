<script setup lang="ts">
import {useSound} from '@/composables/useSound';

const {playSound} = useSound();

// Bei Mount wird die aktuelle Aktion gesetzt
onMounted(() => {
  console.log('Mount CheckmarkModal');
  playSound('/sounds/mode_change.wav');
});

onBeforeUnmount(() => {
  console.log('BeforeUnmount CheckmarkModal');
  playSound('/sounds/mode_change.wav');
});
</script>

<template>
  <div
      class="flex justify-center items-center text-center w-auto h-auto bg-green-200 opacity-85 shadow shadow-green-700 rounded-full"
  >
    <Icon class="text-[10rem] text-green-500 opacity-100" name="material-symbols:check-rounded"/>
  </div>
</template>

<style scoped>

</style>