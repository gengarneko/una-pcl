<template>
  <div class="flex flex-col p-2">
    <div class="mb-2 text-sm font-bold">Camera</div>
    <div class="flex">
      <button
        type="button"
        :class="['btn btn-xs rounded mr-2', { 'btn-active': isFree }]"
        @click="free"
      >
        free
      </button>
      <button
        type="button"
        :class="['btn btn-xs rounded', { 'btn-active': isTopDown }]"
        @click="topDown"
      >
        top-down
      </button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useAdvanceDrama } from "@una-pcl/web3d";
import { computed } from "vue";
const { mouseState, controlMode } = useAdvanceDrama();

const free = () => {
  mouseState.value = "free";
  controlMode.value = "free";
};

const topDown = () => {
  mouseState.value = "free";
  controlMode.value = "top-down";
};

const isFree = computed(() => controlMode.value === "free");
const isTopDown = computed(() => controlMode.value === "top-down");
</script>
<style scoped></style>
