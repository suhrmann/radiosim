<script setup lang="ts">
</script>

<template>
  <div class="flex flex-col h-screen">
    <div class="flex flex-1 items-center space-x-16 justify-center bg-gray-200">
      <!-- Funkgeraet -->
      <RadioDevice/>

      <!-- Konfigurationskomponente -->
      <div class="">
        <ConfigurationSettings/>
      </div>
    </div>
    <div class="bg-gray-500 border-t-2 border-gray-600 text-white text-center font-bold">(c) Lucas Kurz 2024 - <a
        class="text-red-400" href="https://nur-kurz.de/">nur-kurz.de</a></div>
  </div>
</template>

<style scoped>
/* Optionale globale Styles */
</style>