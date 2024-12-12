<template>
  <div class="flex flex-col gap-2 p-2">
    <div class="mb-1 text-sm font-bold">Frames</div>
    <div class="flex gap-2">
      <button type="button" class="mb-1 rounded btn btn-xs" @click="play">
        play
      </button>
      <button type="button" class="mb-1 rounded btn btn-xs" @click="showAll">
        showAll
      </button>
      <button type="button" class="mb-1 rounded btn btn-xs" @click="show10">
        show10
      </button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useDrama } from "@una-pcl/web3d";

const { frames, selectFrame } = useDrama();
const play = () => {
  let current = 0;
  const c = setInterval(() => {
    current++;
    if (current >= frames.length) {
      clearInterval(c);
    } else {
      selectFrame(current);
    }
  }, 100);
};

const showAll = () => {
  selectFrame(frames.map((f) => f.index).filter((i) => i > 0));
};

const show10 = () => {
  selectFrame(frames.map((f) => f.index).filter((i) => i > 0 && i <= 10));
};
</script>
<style scoped></style>
