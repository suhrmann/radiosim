<template>
  <div class="">
    <!-- Ordner-Drop-Zone -->
    <div
        :class="[
        'p-2 my-1 bg-white border-gray-300 border rounded pointer-events-auto hover:bg-gray-200 active:bg-gray-200',
        { 'border-blue-500 bg-blue-100': isDragOverFolder, 'cursor-move': !root },
        { '!border-green-500 !bg-green-100': isDragOverFolder },
      ]"
        :draggable="!root"
        @dragstart="onDragStart($event, folder)"
        @dragover="onDragOverFolder($event, folder)"
        @dragenter="onDragEnterFolder"
        @dragleave="onDragLeaveFolder"
        @drop="onDrop($event, folder)"
    >
      <Icon v-if="!root" name="material-symbols:drag-indicator" class="pointer-events-auto"/>
      📂 {{ folder.name }}
    </div>

    <!-- Gruppen-Drop-Zonen -->
    <div
        v-for="group in folder.groups"
        :key="group.name"
        class="ml-4"
        :class="[
        'p-2 my-1 bg-blue-100 border-gray-300 cursor-move border rounded hover:bg-blue-200 active:bg-blue-200',
      ]"
        :draggable="true"
        @dragstart="onDragStart($event, group)"
        @dragover="onDragOverGroup($event)"
        @dragenter="onDragEnterGroup"
        @dragleave="onDragLeaveGroup"
        @drop="onDrop($event, folder)"
    >
      <Icon name="material-symbols:drag-indicator"/>
      👥 {{ group.name }}
    </div>

    <!-- Rekursive Darstellung von Unterordnern -->
    <div v-if="folder.subFolders">
      <TreeNode
          v-for="subFolder in folder.subFolders"
          :key="subFolder.name"
          class="ml-4"
          :folder="subFolder"
          :root="false"
          @moveItem="handleMoveItem"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type {Folder, Group} from '~/types/interfaces';

const props = defineProps<{ folder: Folder, root: boolean }>();
const emit = defineEmits<{
  (e: 'moveItem', item: Group | Folder, targetFolder: Folder): void;
}>();

const isDragOverFolder = ref(false);
const isDragOverGroup = ref(false);

function onDragStart(event: DragEvent, item: Group | Folder) {
  console.log('DragStart on ', item.name)
  event.dataTransfer?.setData('application/json', JSON.stringify(item));
}

function onDragOverGroup(event: DragEvent) {
  event.preventDefault();
}

function onDragOverFolder(event: DragEvent, item: Folder) {
  event.preventDefault();
}

function onDrop(event: DragEvent, targetFolder: Folder) {
  const data = event.dataTransfer?.getData('application/json');
  console.log('Drop on', targetFolder.name);
  if (data) {
    const item = JSON.parse(data) as Group | Folder;
    console.log('Drop', item.name, 'on', targetFolder.name);
    // Gebe das Event korrekt nach oben weiter, damit es in die Wurzelkomponente gelangt
    emit('moveItem', item, targetFolder);
  }
  isDragOverFolder.value = false;
  isDragOverGroup.value = false;
}

function handleMoveItem(item: Group | Folder, subFolder: Folder) {
  console.log('handleMoveItem for', item.name, 'in', subFolder.name, 'level:', props.root ? 'Root' : 'Deep');
  // Event an die nächste Ebene weitergeben, bis die Root-Ebene erreicht ist
  emit('moveItem', item, subFolder);
}

function onDragEnterFolder() {
  isDragOverFolder.value = true;
}

function onDragLeaveFolder() {
  isDragOverFolder.value = false;
}

function onDragEnterGroup() {
  isDragOverGroup.value = true;
}

function onDragLeaveGroup() {
  isDragOverGroup.value = false;
}
</script>

<style scoped>
/* Kein zusätzliches Styling notwendig */
</style>
