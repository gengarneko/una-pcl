import { AElement, RBox } from "@una-pcl/web3d";

export type ABox = AElement & {
  readonly traceId: string;
} & RBox;
