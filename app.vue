<script lang="ts" setup>
import {useSound} from '@/composables/useSound';
import {useAppSettingsStore} from "~/stores/useAppSettingsStore";

const settings = useAppSettingsStore();

const {playSound} = useSound();

onMounted(() => {
  // Event Listener hinzufügen
  const handleButtonClick = (event: Event) => {
    const target = event.target as HTMLElement;
    if (target.tagName === 'BUTTON') {
      playSound('/sounds/button_sound.wav');
      settings.resetModalTimer();
    }
  };

  document.addEventListener('click', handleButtonClick);

  // Event Listener entfernen, wenn die Komponente zerstört wird
  onBeforeUnmount(() => {
    document.removeEventListener('click', handleButtonClick);
  });
});
</script>

<template>
  <NuxtPage/>
</template>

<style>
button span {
  pointer-events: none;
}
</style>