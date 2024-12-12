<template>
  <div class="flex flex-col w-screen h-screen">
    <div
      class="flex items-center justify-start px-4 py-2 border-b border-gray-600"
    >
      <p class="mr-2 text-xl font-bold">Labeling Tool</p>
      <div class="flex items-center pt-2">
        <svg-icon type="mdi" :path="mdiCar"></svg-icon>
      </div>
    </div>

    <div class="grid flex-1 w-full grid-cols-12 gap-2 pt-4">
      <div ref="toolbox" class="flex flex-col col-span-2 pl-2" />

      <div class="flex flex-col w-full col-span-8">
        <div ref="container" class="main-canvas" />
        <div ref="footer" class="w-full overflow-hidden" />
      </div>

      <div
        ref="rightsidebar"
        class="flex flex-col-reverse col-span-2 p-2 text-xs w-60"
      />
    </div>

    <div class="statusbar" />

    <div class="flex flex-1 hidden p-4">
      <button
        class="flex-wrap items-center justify-center hidden w-6 h-6 gap-1 gap-2 col-gap-2 p-2 pt-0 mt-4 mb-1 mb-2 text-gray-200 border border-gray-600 rounded btn btn-neutral btn-xs btn-active"
      >
        Save
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { Page, runPlugin, useDrama } from "@una-pcl/web3d";
import { mdiCar } from "@mdi/js";

const props = defineProps<{
  page: Page;
}>();

const container = ref<HTMLDivElement>();
const toolbox = ref<HTMLDivElement>();
const footer = ref<HTMLDivElement>();
const rightsidebar = ref<HTMLDivElement>();

const { launch } = useDrama(
  props.page,
  container,
  toolbox,
  footer,
  rightsidebar
);

onMounted(async () => {
  const middlewares = [
    { name: "camera-control", params: {} },
    { name: "frame-pagination", params: {} },
    { name: "answer-cache", params: { auto: false } },
    { name: "answer-history", params: {} },
    //{ name: 'render-sampling', params: { } },
    { name: "spatial-indexing", params: { impl: "octree" } },
    { name: "three-view", params: {} },
    { name: "fullscreen", params: {} },
    { name: "mouse", params: {} },
    { name: "points-style", params: { mode: "label" } },
    { name: "pcd-loader", params: {} },
    { name: "potree-loader", params: {} },
    { name: "render-info", params: {} },
  ];

  for (const middleware of middlewares) {
    await runPlugin(middleware.name).then(({ useMiddleware }) => {
      useMiddleware && useMiddleware(middleware.params);
    });
  }
  for (const plugin of props.page.template.plugins) {
    await runPlugin(plugin.name).then(({ usePlugin }) => {
      usePlugin && usePlugin(plugin.params);
    });
  }
  launch();
});
</script>

<style scoped>
.main-wrap {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.header {
  height: 60px;
}
.main-container {
  display: flex;
  flex-grow: 1;
  min-height: 1px;
}
.leftsidebar {
  width: 160px;
  flex-shrink: 0;
}
.main {
  flex-grow: 1;
  min-width: 1rem;
  display: flex;
  flex-direction: column;
}
.main-canvas {
  flex: 1;
  position: relative;
  background-color: black;
}

.rightsidebar {
  width: 320px;
  flex-shrink: 0;
}

.statusbar {
  height: 22px;
  background-color: grey;
}
</style>
