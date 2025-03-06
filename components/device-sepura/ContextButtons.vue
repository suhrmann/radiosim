<script setup lang="ts">
import {useDeviceStore} from '~/stores/useDeviceStore';
import {useNavigationStore} from "~/stores/useNavigationStore";
import {useAppSettingsStore} from "~/stores/useAppSettingsStore";

const navStore = useNavigationStore();
const store = useDeviceStore();
const settings = useAppSettingsStore();

// handle left context actions
function handleLeftButtonClick(event: Event) {
  // TODO implement me!
}

// handle right context actions
function handleRightButtonClick(event: Event) {
  // TODO implement me!
}
</script>

<template>
  <div class="mb-2 px-2 w-full grid grid-cols-3 gap-2 mt-4 text-sm">
    <button
        class="h-7 mr-5 bg-gray-400 hover:bg-gray-500 active:ring-2 active:ring-inset active:ring-gray-400 rounded-md flex items-center justify-center"
        @click="handleLeftButtonClick">
      <Icon class="text-gray-800" name="material-symbols:power-settings-new" />
    </button>
    <div class="flex justify-center font-bold text-center text-lg">Sepura</div>
    <button
        class="h-7 ml-5 bg-gray-400 hover:bg-gray-500 active:ring-2 active:ring-inset active:ring-gray-400 rounded-md flex items-center justify-center"
        @click="handleRightButtonClick">
      <Icon class="text-gray-800" name="material-symbols:remove"/>
    </button>
  </div>
</template>

<style scoped>
/* Hier kannst du spezifische Styles hinzufügen, falls erforderlich */
</style>