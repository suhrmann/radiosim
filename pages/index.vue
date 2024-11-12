<script setup lang="ts">
</script>

<template>

  <div class="flex flex-1 items-center space-x-16 justify-center bg-gray-200">
    <!-- Funkgeraet -->
    <RadioDevice/>

    <!-- Konfigurationskomponente -->
    <div class="hidden lg:block">
      <ConfigurationSettings/>
    </div>
  </div>

</template>

<style scoped>
/* Optionale globale Styles */
</style>