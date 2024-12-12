<template>
  <div class="flex flex-col gap-2 p-2">
    <div class="text-sm font-bold mb-1">PointStyle</div>
    <button
      type="button"
      class="btn btn-xs rounded"
      @click="shaderMode = 'normal'"
    ></button>
  </div>
</template>
<script setup lang="ts">
import { useDrama } from "@una-pcl/web3d";

const { shaderMode } = useDrama();
</script>
