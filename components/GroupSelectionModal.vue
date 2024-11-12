<script setup lang="ts">
import {useDeviceStore} from '@/stores/useDeviceStore';
import {useAppSettingsStore} from "~/stores/useAppSettingsStore";
import {type Contexts} from "~/types/interfaces";
import {useNavigationStore} from "~/stores/useNavigationStore";

const navStore = useNavigationStore();
const store = useDeviceStore();
const settings = useAppSettingsStore();

function setNavigationForGroupSelection() {
  store.setCurrentAction('selectGroup'); // Setzt die aktuelle Aktion auf "selectGroup"

  const contextMenu: Contexts = {left: 'Auswahl', middle: 'Status', right: 'Abbruch'};
  store.setContexts(contextMenu);
}

// Bei Mount wird die aktuelle Aktion gesetzt
onMounted(() => {
  console.log('Mount GroupSelectionModal');
  navStore.initialize(store.group); // Initialisiere die Gruppe, wenn die Komponente geladen ist

  setNavigationForGroupSelection();

  settings.startModalTimer(() => {
    console.log('TIMEOUT GroupSelectionModal');
    store.confirmGroupChange(navStore.currentGroup);
    store.closeCurrentModal();
  });
});

onBeforeUnmount(() => {
  // Löscht den Timer, falls die Komponente vorzeitig zerstört wird
  settings.stopModalTimer();

  // Das Contextmenu auf den Home-Zustand zuruecksetzen
  store.resetContextmenu();
  store.setCurrentAction('');
  navStore.numberSearch = '';
});
</script>

<template>
  <div class="w-full text-black bg-gray-100 rounded-md shadow-md border-4 border-blue-800">
    <div class="flex items-center p-1 border-b border-black">
      <Icon class="text-xl" name="material-symbols:folder-rounded"/>
      <p class="flex-1 font-bold text-center">Gruppen Auswahl</p>
    </div>
    <div class="text-lg px-2">
      <span class="flex items-center"><Icon class="text-3xl mr-2"
                                            name="material-symbols:groups-rounded"/> {{
          navStore.currentGroup?.name
        }}</span>
      <div class="flex justify-between">
        <div class="text-xl text-blue-800">
          <Icon class="transform -scale-y-100 -rotate-180 " name="line-md:rotate-180"/>
          <Icon name="line-md:rotate-180"/>
        </div>
        <span>{{ navStore.numberSearch ? navStore.numberSearch : navStore.currentGroup?.number }}</span>
      </div>
    </div>
    <div class="flex border-t border-black">
      <div class="flex items-center p-1 text-base border-r border-black">
        {{ navStore.currentLevel }}
        <Icon class="text-xl text-blue-800" name="ri:expand-up-down-fill"/>
      </div>
      <div class="w-full flex justify-between items-center p-1">
        <Icon class="text-xl text-blue-800" name="ri:arrow-left-s-fill"/>
        <span class="text-base">{{ navStore.currentFolder?.name }}</span>
        <Icon class="text-xl text-blue-800" name="ri:arrow-right-s-fill"/>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>