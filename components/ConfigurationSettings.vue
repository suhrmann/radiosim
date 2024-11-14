<script lang="ts" setup>
import {useDeviceStore} from "~/stores/useDeviceStore";
import {useAppSettingsStore} from "~/stores/useAppSettingsStore";

const device = useDeviceStore();
const settings = useAppSettingsStore();
const navigation = useNavigationStore();

function updateTimeout(value: number) {
  settings.setModalTimeout(value);
}

function listenDebug(e: KeyboardEvent) {
  if (e.key === 'D') {
    settings.debug = !settings.debug;
  }
}
</script>

<template>
  <div class="p-4 bg-white border border-gray-300 rounded-md shadow-md focus:outline-none" tabindex="0"
       @keyup.shift="listenDebug">
    <h3 class="font-bold text-xl mb-2">Konfigurationseinstellungen</h3>
    <div class="mb-4">
      <label for="timeout" class="block text-sm font-medium text-gray-700">Gruppenwechsel Timeout (Sekunden)</label>
      <input
          id="timeout"
          type="number"
          min="1"
          v-model.number="settings.modalTimeout"
          @input="updateTimeout($event.target?.value)"
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md"
      />
    </div>

    <div v-if="settings.debug">
      <!-- Anzeige des aktuellen Geraetezustands -->
      <h4 class="font-bold text-base">Geräteinfos</h4>
      <div class="my-4 space-y-2">
        <div>
          <label for="currentAction" class="text-base font-medium text-gray-700 mr-2">Ausgeschaltet:</label>
          <input id="currentAction" class="p-2 border border-gray-300 rounded-md" type="checkbox"
                 v-model="device.isPoweredOff"/>
        </div>
        <div>
          <label for="activeModal" class="text-base font-medium text-gray-700 mr-2">Bootup:</label>
          <input id="activeModal" class="p-2 border border-gray-300 rounded-md" type="checkbox"
                 v-model="device.isBooting"/>
        </div>
      </div>

      <!-- Anzeige der aktuellen Aktion & Modals -->
      <h4 class="font-bold text-base">Aktionsinfos</h4>
      <div class="my-4">
        <label for="currentAction" class="text-sm font-medium text-gray-700">Aktuelle Aktion:</label>
        <input id="currentAction" class="mt-1 block w-full p-2 border border-gray-300 rounded-md" disabled
               :value="device.currentAction || 'Keine Aktion aktiv'"/>
        <label for="activeModal" class="text-sm font-medium text-gray-700">Aktuelles Modal:</label>
        <input id="activeModal" class="mt-1 block w-full p-2 border border-gray-300 rounded-md" disabled
               :value="device.activeModal || 'Kein Modal aktiv'"/>
      </div>

      <!-- Anzeige des aktuellen NavigationStore -->
      <h4 class="font-bold text-base">Navigationsinfos</h4>
      <div class="my-4">
        <label for="activeModal" class="text-sm font-medium text-gray-700">Path:</label>
        <input id="activeModal" class="mt-1 block w-full p-2 border border-gray-300 rounded-md" disabled
               :value="navigation.path"/>

        <label for="activeModal" class="text-sm font-medium text-gray-700">Level:</label>
        <input id="activeModal" class="mt-1 block w-full p-2 border border-gray-300 rounded-md" disabled
               :value="navigation.currentLevel"/>

        <label for="activeModal" class="text-sm font-medium text-gray-700">Gruppe:</label>
        <input id="activeModal" class="mt-1 block w-full p-2 border border-gray-300 rounded-md" disabled
               :value="navigation.currentGroup?.name"/>

        <label for="activeModal" class="text-sm font-medium text-gray-700">Folder:</label>
        <input id="activeModal" class="mt-1 block w-full p-2 border border-gray-300 rounded-md" disabled
               :value="navigation.currentFolder?.name"/>
      </div>

    </div>
  </div>
</template>

<style scoped>
/* Optionale zusätzliche Styles */
</style>
