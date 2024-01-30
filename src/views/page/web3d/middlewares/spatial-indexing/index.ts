import { useDrama } from '@web3d/hooks/drama';

import localforage from 'localforage';
import { Octree, OctreeSerialization } from './libs/Octree';

import { Bruteforce } from './libs/Bruteforce';

import { injectPerformance } from './performance';
import { measure } from '@/stores/performance';

const useOctree = (points: THREE.Points) => {
    const key = 'octree-' + points.geometry.uuid;
    return localforage.getItem<OctreeSerialization>(key).then((data) => {
        if (data) {
            const octree = Octree.fromSerialization(points.geometry, data);
            if (octree) {
                return octree;
            }
        }
        const octree = Octree.fromPointsGeometry(points.geometry);
        localforage.setItem(key, octree.serialization());
        return octree;
    }).then(octree => {
        if (octree) {
            octree.intersect = measure('web3d::octree::intersect', octree.intersect);
            //frame.add(new OctreeHelper(frame.intersectDelegate as unknown as TOctree, 0x00ff00));
        }
        return octree;
    });
};

export const useMiddleware = () => {
    injectPerformance();
    const { frames } = useDrama();

    frames.forEach((frame) => {
        frame.onPointsLoaded.then(({ points }) => {
            frame.intersectDelegate = Bruteforce.fromPoints(points);
            useOctree(points).then(octree => frame.intersectDelegate = octree);
        });
    });
};