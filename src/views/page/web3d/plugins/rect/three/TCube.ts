import * as THREE from 'three';
import { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import { Cube } from '../types';

const _rectMaterial = /*@__PURE__*/ new THREE.MeshBasicMaterial({ color: 0xff0000, opacity: 0.4, transparent: true });
const _edgeMaterial = /*@__PURE__*/ new THREE.LineBasicMaterial({ color: 0xffffff });

export class TCube extends THREE.Mesh {
    private _boxgeo: THREE.BoxGeometry;
    private _edgegeo: THREE.EdgesGeometry;
    private _label: CSS2DObject;

    constructor(rect3d: Cube) {
        const geometry = new THREE.BoxGeometry(rect3d.size.length, rect3d.size.width, rect3d.size.height);
        geometry.translate(rect3d.position.x, rect3d.position.y, rect3d.position.z);
        geometry.applyQuaternion(
            new THREE.Quaternion().setFromEuler(
                new THREE.Euler(rect3d.rotation.phi, rect3d.rotation.psi, rect3d.rotation.theta)));
        super(geometry, _rectMaterial);
        const edges = new THREE.EdgesGeometry(geometry);
        const line = new THREE.LineSegments(edges, _edgeMaterial);
        this.add(line);

        const div = document.createElement('div');
        div.textContent = rect3d.label;
        div.style.padding = '2px';
        div.style.color = '#fff';
        div.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        div.style.fontSize = '14px';
        div.style.pointerEvents = 'none';
        div.style.userSelect = 'none';
        this._label = new CSS2DObject(div);
        this._label.translateX(rect3d.position.x).translateY(rect3d.position.y).translateZ(rect3d.position.z + rect3d.size.height / 2);
        this._label.updateMatrix();
        this.add(this._label);
        
        this._boxgeo = geometry;
        this._edgegeo = edges;
    }

    get isTCube() {
        return true;
    }
    dispose() {
        this._boxgeo.dispose();
        this._edgegeo.dispose();
    }
}