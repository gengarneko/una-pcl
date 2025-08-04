<template>
  <PageView v-if="page" :page="page" />
</template>
<script lang="ts" setup>
import { Page } from "@una-pcl/web3d";
import PageView from "./views/PageView.vue";
import { ref } from "vue";

const page = ref<Page>();

const URL = "/200/page.json";

fetch(URL)
  .then((response) => response.json() as Promise<Page>)
  .then((data) => {
    page.value = data;
  });
</script>
