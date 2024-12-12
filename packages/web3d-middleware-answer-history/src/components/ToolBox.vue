<template>
  <div class="flex flex-col gap-2 p-2">
    <div class="mb-1 text-sm font-bold">Answer</div>
    <div class="flex gap-2">
      <button type="button" class="rounded btn btn-xs" @click="reset">
        reset
      </button>
      <button
        type="button"
        class="mb-1 rounded btn btn-xs"
        :disabled="!canUndo"
        @click="undo"
      >
        undo
      </button>
      <button
        type="button"
        class="rounded btn btn-xs"
        :disabled="!canRedo"
        @click="redo"
      >
        redo
      </button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useAnswerHistoryStore } from "../stores/answer";
import { storeToRefs } from "pinia";

const answerHistoryStore = useAnswerHistoryStore();
const { canUndo, canRedo } = storeToRefs(answerHistoryStore);
const { undo, redo, reset } = answerHistoryStore;
</script>
<style lang="less" scoped></style>
