<script lang="ts" setup>
import {useDeviceStore} from '~/stores/useDeviceStore';
import {useNavigationStore} from "~/stores/useNavigationStore";

const store = useDeviceStore();
const navStore = useNavigationStore();

function handleStarButtonClick() {
  if (store.currentAction === '') {
    console.log('Toggle LockModeModal')
    store.toggleModal('LockModeModal');
  }
}

function handleNumberButtonClick(num: number) {
  if (store.currentAction === 'selectGroup') {
    navStore.navigateByNumber(num)
  }
}
</script>

<template>
  <div class="px-2 w-full grid grid-cols-3 gap-3 font-bold">
    <button
        class="h-9 mx-3 bg-gray-600 hover:bg-gray-700 active:ring-2 active:ring-inset active:ring-gray-600 rounded-md flex flex-col items-center justify-center"
        @click="handleNumberButtonClick(1)">
      <span>1</span>
      <span class="font-thin text-xs">-</span>
    </button>
    <button
        class="h-9 mx-3 bg-gray-600 hover:bg-gray-700 active:ring-2 active:ring-inset active:ring-gray-600 rounded-md flex flex-col items-center justify-center"
        @click="handleNumberButtonClick(2)">
      <span>2</span>
      <span class="ml-1 font-thin text-xs">abc</span>
    </button>
    <button
        class="h-9 mx-3 bg-gray-600 hover:bg-gray-700 active:ring-2 active:ring-inset active:ring-gray-600 rounded-md flex flex-col items-center justify-center"
        @click="handleNumberButtonClick(3)">
      <span>3</span>
      <span class="ml-1 font-thin text-xs">def</span>
    </button>
    <button
        class="h-9 mx-3 bg-gray-600 hover:bg-gray-700 active:ring-2 active:ring-inset active:ring-gray-600 rounded-md flex flex-col items-center justify-center"
        @click="handleNumberButtonClick(4)">
      <span>4</span>
      <span class="ml-1 font-thin text-xs">ghi</span>
    </button>
    <button
        class="h-9 mx-3 bg-gray-600 hover:bg-gray-700 active:ring-2 active:ring-inset active:ring-gray-600 rounded-md flex flex-col items-center justify-center"
        @click="handleNumberButtonClick(5)">
      <span>5</span>
      <span class="ml-1 font-thin text-xs">jkl</span>
    </button>
    <button
        class="h-9 mx-3 bg-gray-600 hover:bg-gray-700 active:ring-2 active:ring-inset active:ring-gray-600 rounded-md flex flex-col items-center justify-center"
        @click="handleNumberButtonClick(6)">
      <span>6</span>
      <span class="ml-1 font-thin text-xs">mno</span>
    </button>
    <button
        class="h-9 mx-3 bg-gray-600 hover:bg-gray-700 active:ring-2 active:ring-inset active:ring-gray-600 rounded-md flex flex-col items-center justify-center"
        @click="handleNumberButtonClick(7)">
      <span>7</span>
      <span class="ml-1 font-thin text-xs">pqrs</span>
    </button>
    <button
        class="h-9 mx-3 bg-gray-600 hover:bg-gray-700 active:ring-2 active:ring-inset active:ring-gray-600 rounded-md flex flex-col items-center justify-center"
        @click="handleNumberButtonClick(8)">
      <span>8</span>
      <span class="ml-1 font-thin text-xs">tuv</span>
    </button>
    <button
        class="h-9 mx-3 bg-gray-600 hover:bg-gray-700 active:ring-2 active:ring-inset active:ring-gray-600 rounded-md flex flex-col items-center justify-center"
        @click="handleNumberButtonClick(9)">
      <span>9</span>
      <span class="ml-1 font-thin text-xs">wxyz</span>
    </button>
    <button
        class="h-9 mx-3 bg-gray-600 hover:bg-gray-700 active:ring-2 active:ring-inset active:ring-gray-600 rounded-md flex flex-col items-center justify-center"
        @click="handleStarButtonClick">
      <span>*</span>
    </button>
    <button
        class="h-9 mx-3 bg-gray-600 hover:bg-gray-700 active:ring-2 active:ring-inset active:ring-gray-600 rounded-md flex flex-col items-center justify-center"
        @click="handleNumberButtonClick(0)">
      <span>0</span>
      <span class="ml-1 font-thin text-xs">.,;</span>
    </button>
    <button
        class="h-9 mx-3 bg-gray-600 hover:bg-gray-700 active:ring-2 active:ring-inset active:ring-gray-600 rounded-md flex flex-col items-center justify-center">
      <span>#</span>
    </button>
  </div>
</template>

<style scoped>
/* Hier kannst du spezifische Styles hinzufügen, falls erforderlich */
</style>
