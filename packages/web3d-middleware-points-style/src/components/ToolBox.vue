<template>
  <div class="flex flex-col gap-2 p-2">
    <div class="mb-1 text-sm font-bold">PointStyle</div>
    <div class="flex flex-wrap gap-2">
      <button
        type="button"
        class="mb-1 rounded btn btn-xs"
        @click="shaderMode = 'normal'"
      >
        normal
      </button>
      <button
        type="button"
        class="mb-1 rounded btn btn-xs"
        @click="shaderMode = 'label'"
      >
        label
      </button>
      <button
        type="button"
        class="mb-1 rounded btn btn-xs"
        @click="shaderMode = 'intensity'"
      >
        intensity
      </button>
      <button
        type="button"
        class="rounded btn btn-xs"
        @click="shaderMode = 'deep'"
      >
        deep
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useDrama } from "@una-pcl/web3d";

const { shaderMode } = useDrama();
</script>
