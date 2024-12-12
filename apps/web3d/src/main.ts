import { createApp } from "vue";
import { createPinia } from "pinia";
import "./index.css";
import App from "./App.vue";
import "./svg-icon";

import { registerPlugin } from "@una-pcl/web3d";

// middleware
registerPlugin(
  "answer-cache",
  () => import("@una-pcl/web3d-middleware-answer-cache")
);
registerPlugin(
  "answer-history",
  () => import("@una-pcl/web3d-middleware-answer-history")
);
registerPlugin(
  "camera-control",
  () => import("@una-pcl/web3d-middleware-camera-control")
);
registerPlugin(
  "frame-pagination",
  () => import("@una-pcl/web3d-middleware-frame-pagination")
);
registerPlugin(
  "fullscreen",
  () => import("@una-pcl/web3d-middleware-fullscreen")
);
registerPlugin("mouse", () => import("@una-pcl/web3d-middleware-mouse"));
registerPlugin(
  "render-sampling",
  () => import("@una-pcl/web3d-middleware-render-sampling")
);
registerPlugin(
  "spatial-indexing",
  () => import("@una-pcl/web3d-middleware-spatial-indexing")
);
registerPlugin(
  "three-view",
  () => import("@una-pcl/web3d-middleware-three-view")
);
registerPlugin(
  "points-style",
  () => import("@una-pcl/web3d-middleware-points-style")
);
registerPlugin(
  "pcd-loader",
  () => import("@una-pcl/web3d-middleware-pcd-loader")
);
registerPlugin(
  "potree-loader",
  () => import("@una-pcl/web3d-middleware-potree-loader")
);
registerPlugin(
  "render-info",
  () => import("@una-pcl/web3d-middleware-render-info")
);

// plugin
registerPlugin("box", () => import("@una-pcl/web3d-plugin-box"));
registerPlugin("parsing", () => import("@una-pcl/web3d-plugin-parsing"));
registerPlugin("line", () => import("@una-pcl/web3d-plugin-line"));
registerPlugin(
  "projection2d",
  () => import("@una-pcl/web3d-plugin-projection2d")
);

createApp(App).use(createPinia()).mount("#app");
