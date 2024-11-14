<script setup lang="ts">
import {folderData} from "~/data/folderData";

const folderDataRef = ref(folderData);
const fileInput = ref<HTMLInputElement | null>(null);

function downloadFolderData() {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(folderData, null, 2));
  const downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute("href", dataStr);
  downloadAnchorNode.setAttribute("download", "folderData.json");
  document.body.appendChild(downloadAnchorNode); // Required for Firefox
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
}

function triggerFileInput() {
  fileInput.value?.click();
}

function uploadFolderData(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const result = e.target?.result;
      if (typeof result === 'string') {
        const parsedData = JSON.parse(result);
        Object.assign(folderDataRef.value, parsedData); // Verwende Object.assign, um die Werte zu aktualisieren
        alert('Folder data successfully imported!');
        fileInput.value!.value = ""; // Reset file input to allow uploading the same file again if needed
      }
    } catch (error) {
      alert('Failed to import folder data. Please make sure the file is valid JSON.');
      fileInput.value!.value = ""; // Reset file input to allow uploading the same file again if needed
    }
  };
  reader.readAsText(file);
}
</script>

<template>
  <div class="flex flex-1 items-center space-x-16 justify-center bg-gray-200 py-12 max-h-screen overflow-hidden">
    <TreeView :folder="folderDataRef" class="h-full p-4 bg-white rounded overflow-auto max-h-screen"/>
    <div class="flex flex-col w-full max-w-screen-md h-full my-4 bg-white rounded overflow-hidden">
      <!--<div class="space-x-1 p-4">
        <button
            class="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 focus:outline-none"
            type="button">
          Neu
        </button>
        <button
            class="py-2.5 px-5 me-2 text-sm font-medium text-red-500 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-red-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
            type="button">
          Löschen
        </button>
      </div>-->
      <div class="flex-1 h-full border-y overflow-auto max-h-screen">
        <div class="p-4 space-y-4">
          <h2 class="text-xl font-bold">Gruppenkonfiguration</h2>
          <p>Hier kannst du deine persönliche Gruppenkonfiguration importieren. Über den Button <span
              class="font-bold italic">"Export"</span>
            solltest du dir
            zunächst die Musterdatei herunterladen. Nach Bearbeitung dieser Musterdatei kannst du dann über den
            <span
                class="font-bold italic text-blue-700">Importbutton</span> deine eigene Konfiguration in die Anwendung
            laden.</p>
          <p>
            Es ist wichtig, bei der Bearbeitung der Datei auf die korrekte Syntax zu achten.
          </p>
          <p>In Zukunft soll der Zustand auch zwischen einzelnen Browsersitzungen gespeichert werden, sodass du die
            Konfiguration nicht jedes mal neu laden musst.</p>
          <p>Ebenfalls sollst du auf dieser Seite in Zukunft einzelne Gruppen hinzufügen und löschen können, damit eine
            Bearbeitung der Musterdatei über einen Texteditor nicht zwingend notwendig ist.</p>
        </div>
      </div>
      <div class="space-x-1 p-4">
        <!-- Importfunktion -->
        <button
            class="py-2.5 px-5 me-2 text-sm font-medium text-white focus:outline-none bg-blue-700 rounded-lg border border-gray-200 hover:bg-blue-800 focus:z-10 focus:ring-4 focus:ring-gray-100"
            type="button"
            @click="triggerFileInput">
          Import
        </button>
        <input type="file" ref="fileInput" @change="uploadFolderData" class="hidden" accept=".json"/>

        <!-- Exportfunktion -->
        <button
            class="py-2.5 px-5 me-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
            type="button"
            @click="downloadFolderData">
          Export
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Optionale globale Styles */
[type=file] {
  background: unset;
  border-color: inherit;
  border-radius: 0;
  border-width: 0;
  font-size: unset;
  line-height: inherit;
  padding: 0;
}
</style>