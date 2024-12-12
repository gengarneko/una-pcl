<template>
  <div v-if="info" class="metric-panel">
    <pre>{{ formattedInfo }}</pre>
  </div>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { useRenderInfoStore } from "../stores";
import { storeToRefs } from "pinia";

const { info } = storeToRefs(useRenderInfoStore());
const formattedInfo = computed(() => {
  return JSON.stringify(info.value, null, 2);
});
</script>
<style scoped>
.metric-panel {
  background-color: #000;
  opacity: 0.4;
  color: #eee;
  position: absolute;
  top: 0;
  left: 0;
  font-size: 12px;
  width: 180px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 4px;
}
</style>
