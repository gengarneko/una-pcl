<template>
  <div class="flex flex-col gap-2 p-2">
    <div class="mb-2 text-sm font-bold">Box</div>
    <div class="flex gap-2">
      <button
        type="button"
        class="mb-2 rounded btn btn-xs"
        @click="click('rect')"
      >
        rect
      </button>
      <button type="button" class="rounded btn btn-xs" @click="copyNextFocus()">
        copy to next
      </button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useDrama } from "@una-pcl/web3d";
import { useCopyNextAction } from "../actions/copynext";

const { activeTool, mouseState } = useDrama();
const click = (mode: string) => {
  activeTool.value = "rect";
  mouseState.value = mode;
};
const { copyNextFocus } = useCopyNextAction();
</script>
<style scoped></style>
