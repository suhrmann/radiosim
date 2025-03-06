<template>

  <DeviceLK24 v-if="store.deviceId === 'default'" />
  <DeviceLK24 v-else-if="store.deviceId === 'lk24'" />
  <div v-else>ERROR: Device ID "{{store.deviceId}}" not found!</div>

</template>

<script setup lang="ts">
import {useDeviceStore} from '@/stores/useDeviceStore';

const store = useDeviceStore();
</script>
