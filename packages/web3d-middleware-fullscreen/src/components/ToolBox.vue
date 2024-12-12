<template>
  <div class="flex flex-col gap-2 p-2">
    <div class="mb-1 text-sm font-bold">Fullscreen</div>
    <div class="flex gap-2">
      <button type="button" class="rounded btn btn-xs" @click="fullscreen">
        fullscreen
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useFullscreen } from "@vueuse/core";
import { useDrama } from "@una-pcl/web3d";
import { Ref } from "vue";

const { container } = useDrama();

const { enter: fullscreen } = useFullscreen(container as Ref<HTMLElement>);
</script>
