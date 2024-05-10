import { useAdvanceDrama, usePerformanceStore } from '@cutie/web3d';
import localforage from 'localforage';
import { Octree } from './libs/Octree';
import { QuadTree } from './libs/QuadTree';
import { Bruteforce } from './libs/Bruteforce';
import { injectPerformance } from './performance';
import { Points } from 'three';
import { TFrustumCulledPoints } from './three/TFrustumCulledPoints';
import { OctreeHelper } from 'three/examples/jsm/Addons.js';
import * as THREE from 'three';
import { SpatialTreeSerialization } from './libs/SpatialTree';

const buildOctree = (points: Points) => {
    const { measure } = usePerformanceStore();
    const key = 'octree-' + points.geometry.uuid;
    return localforage.getItem<SpatialTreeSerialization>(key).then((data) => {
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
        }
        return octree;
    });
};

const buildQuadTree = (points: Points) => {
    const { measure } = usePerformanceStore();
    const key = 'quadtree-' + points.geometry.uuid;
    return localforage.getItem<SpatialTreeSerialization>(key).then((data) => {
        if (data) {
            const quadtree = QuadTree.fromSerialization(points.geometry, data);
            if (quadtree) {
                return quadtree;
            }
        }
        const quadtree = QuadTree.fromPointsGeometry(points.geometry);
        localforage.setItem(key, quadtree.serialization());
        return quadtree;
    }).then(quadtree => {
        if (quadtree) {
            quadtree.intersect = measure('web3d::quadtree::intersect', quadtree.intersect);
        }
        return quadtree;
    });
};

type Config = {
    readonly spatialTree: 'octree' | 'quadtree';
};

const defaultConfig: Config = {
    spatialTree: 'quadtree',
};

export const useMiddleware = (config?: Partial<Config>) => {
    const {
        spatialTree,
    } = {
        ...defaultConfig,
        ...config,
    };
    const treeBuilder = spatialTree === 'octree' ? buildOctree : buildQuadTree;
    injectPerformance();
    const { frames, onBeforeRender } = useAdvanceDrama();

    const tPoints: TFrustumCulledPoints[] = [];

    onBeforeRender(({ camera }) => {
        const frustum = new THREE.Frustum();
        const projScreenMatrix = new THREE.Matrix4();
        projScreenMatrix.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse);
        frustum.setFromProjectionMatrix(projScreenMatrix);

        tPoints.forEach(p => {
            if (p.parent?.visible === true) {
                p.onBeforeProject(frustum);
            }
        });
    });

    frames.forEach((frame) => {
        frame.onPointsLoaded.then(({ frame, points, callback }) => {
            frame.intersectDelegate = Bruteforce.fromPoints(points);
            treeBuilder(points).then(tree => {
                frame.intersectDelegate = tree;
                if (callback) {
                    //callback(points);
                    const p = new TFrustumCulledPoints(points, tree);
                    tPoints.push(p);
                    callback(p);
                    //frame.add(new OctreeHelper(tree))
                }
            });
        });
    });
};