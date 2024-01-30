import * as THREE from 'three';
import { useResizeObserver, MaybeRefOrGetter } from '@vueuse/core';

export const useCamera = (container: MaybeRefOrGetter<HTMLDivElement | undefined>) => {
    const camera = new THREE.PerspectiveCamera(45, 1, 1, 2000);
    camera.position.z = 30;
    camera.up.set(1, 0, 0);
    camera.lookAt(0, 1, 0);
    camera.updateProjectionMatrix();

    useResizeObserver(container, (entries) => {
        const entry = entries[0];
        const { width, height } = entry.contentRect;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    });
    return { camera };
};