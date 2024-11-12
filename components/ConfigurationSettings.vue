<script lang="ts" setup>
import {useDeviceStore} from "~/stores/useDeviceStore";
import {useAppSettingsStore} from "~/stores/useAppSettingsStore";

const device = useDeviceStore();
const store = useAppSettingsStore();

function updateTimeout(value: number) {
  store.setModalTimeout(value);
}
</script>

<template>
  <div class="p-4 bg-gray-100 rounded-md shadow-md">
    <h3 class="font-bold text-lg mb-2">Konfigurationseinstellungen</h3>
    <div class="mb-4">
      <label for="timeout" class="block text-sm font-medium text-gray-700">Gruppenwechsel Timeout (Sekunden)</label>
      <input
          id="timeout"
          type="number"
          min="1"
          v-model.number="store.modalTimeout"
          @input="updateTimeout($event.target.value)"
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md"
      />
    </div>

    <!-- Anzeige der aktuellen Aktion -->
    <div class="mt-4">
      <label for="currentAction" class="text-sm font-medium text-gray-700">Aktuelle Aktion:</label>
      <input id="currentAction" class="mt-1 block w-full p-2 border border-gray-300 rounded-md" disabled
             :value="device.currentAction || 'Keine Aktion aktiv'"/>
    </div>

    <!-- Anzeige des aktuell aktiven Modals -->
    <div class="mt-4">
      <label for="activeModal" class="text-sm font-medium text-gray-700">Aktuelles Modal:</label>
      <input id="activeModal" class="mt-1 block w-full p-2 border border-gray-300 rounded-md" disabled
             :value="device.activeModal || 'Kein Modal aktiv'"/>
    </div>
  </div>
</template>

<style scoped>
/* Optionale zusätzliche Styles */
</style>
