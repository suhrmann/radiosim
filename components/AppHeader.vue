<script setup lang="ts">
import {useDeviceStore} from '@/stores/useDeviceStore';

const store = useDeviceStore();

let isOpen = ref(false)

function changeRadioDevice(deviceId: string) {
  isOpen.value = false;  // close dropdown

  store.changeDevice(deviceId);  // change radio device
}
</script>

<template>
  <div class="border-b border-gray-300">
    <div
        class="mx-auto px-4 sm:px-6 lg:px-8 max-w-full py-4 lg:flex lg:items-center lg:justify-between lg:gap-x-3">
      <NuxtLink class="text-3xl hover:opacity-60 transition-opacity" to="/">
        Funk<span class="text-blue-800">Sim</span>
      </NuxtLink>
      <ul class="items-center gap-x-8 hidden lg:flex">
        <li>
          <div class="relative inline-block text-left">
            <div>
              <button @click="isOpen = !isOpen" type="button" class="border-none  inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50" id="menu-button" aria-expanded="true" aria-haspopup="true">
                Funkgerät
                <svg class="-mr-1 size-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                  <path fill-rule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>
            <div v-if="isOpen" class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 focus:outline-hidden" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
              <div class="py-1" role="none">
                <!-- Active: "bg-gray-100 text-gray-900 outline-hidden", Not Active: "text-gray-700" -->
                <NuxtLink @click="changeRadioDevice('lk24')" to="/" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="menu-item-1">LK24 (default)</NuxtLink>
              </div>
            </div>
          </div>
        </li>
        <li>
          <NuxtLink to="/groups" class="text-sm/6 font-semibold flex items-center gap-1 hover:text-primary">
            Gruppenmatrix
          </NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>