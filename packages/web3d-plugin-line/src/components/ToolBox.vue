<template>
  <div class="flex flex-col gap-2 p-2">
    <div class="mb-2 text-sm font-bold">Line</div>
    <div class="flex gap-2">
      <button type="button" class="rounded btn btn-xs" @click="click('line')">
        line
      </button>
      <button
        type="button"
        class="rounded btn btn-xs"
        @click="autoGeneratePointsForFocus"
      >
        auto
      </button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useDrama } from "@una-pcl/web3d";
import { useAutoAction } from "../actions/auto";

const { activeTool, mouseState } = useDrama();
const click = (mode: string) => {
  activeTool.value = "line";
  mouseState.value = mode;
};

const { autoGeneratePointsForFocus } = useAutoAction();
</script>
<style scoped></style>
