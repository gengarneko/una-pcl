import { defineStore } from "pinia";
import { AnswerContent, Operation, useAdvanceDrama } from "@una-pcl/web3d";
import { useManualRefHistory } from "@vueuse/core";
import { shallowRef } from "vue";

const MAX_HISTORY_COUNT = 10;

export const useAnswerHistoryStore = defineStore(
  "plugin::answer-history",
  () => {
    const { originAnswer, onSetupAnswer, onApplyOperation } = useAdvanceDrama();
    const { history, commit, undo, redo, clear, canUndo, canRedo } =
      useManualRefHistory<AnswerContent>(originAnswer, {
        capacity: MAX_HISTORY_COUNT,
      });
    const operations = shallowRef<Operation[]>([]);

    onSetupAnswer(() => {
      commit();
      clear();
    });

    onApplyOperation(({ operation }) => {
      commit();
      operations.value = [
        operation,
        ...operations.value.slice(0, MAX_HISTORY_COUNT - 1),
      ];
    });

    const reset = () => {
      originAnswer.value = {
        ...originAnswer.value,
        elements: [],
      };
      clear();
    };

    return {
      history,
      operations,
      undo,
      redo,
      clear,
      canUndo,
      canRedo,
      reset,
    };
  },
);
