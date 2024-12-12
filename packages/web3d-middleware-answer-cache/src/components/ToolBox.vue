<template>
  <div class="flex flex-col gap-2 p-2 pt-0">
    <div class="mb-1 text-sm font-bold">Cache</div>
    <div class="flex gap-2">
      <button type="button" class="rounded btn btn-xs" @click="save">
        ManualSave
      </button>
      <button
        type="button"
        :class="['btn btn-xs rounded', { 'btn-active': autoSave }]"
        @click="switchAutoSave"
      >
        AutoSave {{ autoSave ? "ON" : "OFF" }}
      </button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useAnswerCacheStore } from "../stores";

const answerCacheStore = useAnswerCacheStore();
const { save } = answerCacheStore;
const { autoSave } = storeToRefs(answerCacheStore);

const switchAutoSave = () => {
  autoSave.value = !autoSave.value;
};
</script>
<style lang="less" scoped></style>
