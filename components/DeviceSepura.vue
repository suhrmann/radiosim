<template>

  <div class="flex flex-col my-4">
    <div class="relative">
      <!-- Drehknopf -->
      <NavigationKnob class="relative left-4 bottom-0"/>
      <!-- Antenna -->
      <div class="absolute right-4 bottom-0 h-14 lg:h-60 w-10 bg-gray-800 rounded-t-2xl"></div>
    </div>
    <div class="bg-gray-800 min-w-72 w-72 max-w-72 rounded-xl text-white shadow-lg">
      <!-- LEDs Component -->
      <LEDs/>

      <ContextButtons />

      <div class="flex flex-col items-center pb-4">
        <!-- Screen Section -->
        <Screen/>

        <!-- Navigation and Side Buttons -->
        <NavigationButtons/>

        <!-- Keypad Section -->
        <Keypad/>
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">
import LEDs from '~/components/device-sepura/LEDs.vue';
import Screen from '~/components/device-sepura/Screen.vue';
import ContextButtons from '~/components/device-sepura/ContextButtons.vue';
import NavigationButtons from '~/components/device-sepura/NavigationButtons.vue';
import Keypad from '~/components/device-sepura/Keypad.vue';
import NavigationKnob from "~/components/device-sepura/NavigationKnob.vue";
</script>