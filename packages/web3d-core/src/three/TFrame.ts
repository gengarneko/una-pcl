import * as THREE from "three";
import { LAYER_POINTS } from "../constants";

export interface IntersectAbleObject {
  containsPoint(point: THREE.Vector3): boolean;
  intersectsBox(box: THREE.Box3): boolean;
}

export interface PointsIntersect {
  intersect(
    obj: IntersectAbleObject,
    callback: (point: THREE.Vector3, i: number) => void,
  ): void;
  intersectRay(
    obj: THREE.Ray,
    d: number,
    callback: (point: THREE.Vector3, i: number) => void,
  ): void;
}

const _infSphere = new THREE.Sphere(new THREE.Vector3(0, 0, 0), Infinity);

export interface ITFrame extends PointsIntersect {
  readonly index: number;
  readonly frame: THREE.Object3D;
  intersectDelegate: PointsIntersect | undefined;
  points: THREE.Points | undefined;
  readonly onPointsLoaded: Promise<{
    frame: ITFrame;
    points: THREE.Points;
    callback?: (point: THREE.Points) => void;
  }>;
}

// 兼容Promise.withResolvers()
const promiseWithResolvers = <T>() => {
  let resolve: (payload: T) => void;
  let reject: () => void;
  const promise = new Promise<T>((resolve_, reject_) => {
    resolve = resolve_;
    reject = reject_;
  });
  return {
    // @ts-ignore
    resolve,
    reject,
    promise,
  };
};

export class TFrame extends THREE.Object3D implements ITFrame {
  readonly index: number;
  readonly local: THREE.Object3D;
  readonly timestamp: number = 0;
  _points: THREE.Points | undefined;
  renderPoints: THREE.Points | undefined;

  intersectDelegate: PointsIntersect | undefined;

  _pointsLoadedPromise: {
    promise: Promise<{
      frame: TFrame;
      points: THREE.Points;
      callback?: (point: THREE.Points) => void;
    }>;
    resolve: (payload: {
      frame: TFrame;
      points: THREE.Points;
      callback?: (point: THREE.Points) => void;
    }) => void;
    reject: () => void;
  };

  constructor(index: number, timestamp: number) {
    super();
    this.index = index;
    this.local = new THREE.Object3D();
    this.add(this.local);
    this.timestamp = timestamp;
    // @ts-ignore
    this._pointsLoadedPromise = promiseWithResolvers();
    this.addEventListener("change", () => {
      // @ts-ignore
      this.frame.parent?.dispatchEvent({ type: "change" });
    });
  }

  get frame() {
    return this;
  }

  set points(obj: THREE.Points | undefined) {
    if (this._points !== undefined) {
      throw new Error("points was set already");
    }
    this._points = obj;
    if (this._points !== undefined) {
      this._points.layers.enable(LAYER_POINTS);
      this._points.frustumCulled = false;
      this._points.geometry.boundingSphere = _infSphere;
      this._pointsLoadedPromise.resolve({
        frame: this,
        points: this._points,
        callback: (point) => {
          this.local.add(point);
          if (this.frame.visible) {
            this.update();
          }
          // console.log(point);
        },
      });
    }
  }

  add(...object: THREE.Object3D<THREE.Object3DEventMap>[]) {
    super.add(...object);
    for (const obj of object) {
      obj.updateMatrixWorld(true);
    }
    return this;
  }

  get points() {
    return this._points;
  }

  get onPointsLoaded(): Promise<{
    frame: TFrame;
    points: THREE.Points;
    callback?: (point: THREE.Points) => void;
  }> {
    return this._pointsLoadedPromise.promise;
  }

  intersect(
    obj: IntersectAbleObject,
    callback: (point: THREE.Vector3, index: number) => void,
  ) {
    this.intersectDelegate?.intersect(obj, callback);
  }

  intersectRay(
    obj: THREE.Ray,
    d: number,
    callback: (point: THREE.Vector3, index: number) => void,
  ) {
    this.intersectDelegate?.intersectRay(obj, d, callback);
  }

  update() {
    // @ts-ignore
    this.frame.dispatchEvent({ type: "change" });
  }
}
