<template>
  <div class="flex flex-col gap-2 p-2">
    <div class="mb-1 text-sm font-bold">Parsing</div>
    <div class="flex gap-2">
      <button
        type="button"
        class="mb-1 rounded btn btn-xs"
        @click="click('rect')"
      >
        rect
      </button>
      <button
        type="button"
        class="mb-1 rounded btn btn-xs"
        @click="click('polyline')"
      >
        polyline
      </button>
      <button type="button" class="rounded btn btn-xs" @click="dump()">
        dump
      </button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useDrama } from "@una-pcl/web3d";
import { FieldXYZ, PCDFields, dumpBinary } from "../features/dump";
import { useParsingStore } from "../stores";
import { storeToRefs } from "pinia";
import * as THREE from "three";

const { activeTool, mouseState, activeFrames } = useDrama();
const { instances } = storeToRefs(useParsingStore());

const click = (mode: string) => {
  activeTool.value = "parsing";
  mouseState.value = mode;
};

const dump = () => {
  const rgbColors = instances.value.map((instance) => {
    const c = new THREE.Color(instance.color);
    return c.getHex();
  });
  const fieldRGB: PCDFields = {
    name: ["rgb"],
    type: ["I"],
    size: [4],
    value: (geometry, index) => [
      rgbColors[geometry.attributes.label.array[index]] ?? 0xffffff,
    ],
  };
  const buffer = dumpBinary(activeFrames.value, [FieldXYZ, fieldRGB]);

  const blob = new Blob([buffer], { type: "application/octet-stream" });
  const blobUrl = URL.createObjectURL(blob);
  window.open(blobUrl);
};
</script>
<style scoped></style>
