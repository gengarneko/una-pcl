<template>
    <div class="toolbox-panel">
        <div class="toolbox-title">PointStyle</div>
        <button
            type="button"
            class="toolbox-button"
            @click="shaderMode='normal'"
        >
        </button>
    </div>
</template>
<script setup lang="ts">
import { useDrama } from '@una-pcl/web3d';

const { shaderMode } = useDrama();

</script>