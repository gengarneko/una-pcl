<template>
  <div
    class="flex flex-wrap gap-2 p-2"
    style="margin-left: -8px; margin-right: -8px"
  >
    <div
      v-for="frame in frames"
      :key="frame.index"
      class="flex items-center justify-center w-6 h-6 text-xs text-center border border-gray-600 rounded"
      :class="{ active: isActive(frame), primary: isPrimary(frame) }"
      @click="() => selectFrame(frame.index)"
    >
      {{ frame.index }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { TFrame, useDrama } from "@una-pcl/web3d";

const { frames, activeFrames, primaryFrame, selectFrame } = useDrama();

const isActive = (frame: TFrame) => {
  return activeFrames.value.includes(frame);
};
const isPrimary = (frame: TFrame) => {
  return primaryFrame.value === frame;
};
</script>

<style scoped>
.frame-pagination-container {
  display: flex;
  flex-wrap: wrap;
  padding: 8px;
  column-gap: 8px;
}
.frame-pagination {
  width: 16px;
  height: 16px;
  border: 1px solid #333333;
  font-size: 12px;
  text-align: center;
  cursor: pointer;
}
.frame-pagination.active {
  border: 1px solid #3333ff;
}

.frame-pagination.primary {
  background-color: #ff0000;
}
</style>
