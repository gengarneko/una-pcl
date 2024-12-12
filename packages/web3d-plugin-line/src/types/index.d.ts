import { AElement } from "@una-pcl/web3d";

export interface ALine extends AElement {
  readonly points: {
    x: number;
    y: number;
    z: number;
  }[];
}
