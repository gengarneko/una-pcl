import { addNodeToContainer, useAdvanceDrama } from "@una-pcl/web3d";
import { h, watch } from "vue";
import MouseActionPreview from "./components/MouseActionPreview.vue";
import { drawRect } from "./actions/rect";
import { drawPolyline } from "./actions/polyline";
import { click } from "./actions/click";
import { hover } from "./actions/hover";
import { drawLine } from "./actions/line";
import { useMouseStore } from "./stores";
import { storeToRefs } from "pinia";

export const useMiddleware = () => {
  const { container, renderer, mouseState, mouseEventHook } = useAdvanceDrama();
  const mainCanvas = renderer.domElement;
  const { mouseEvent } = storeToRefs(useMouseStore());

  click(
    mainCanvas,
    () => mouseState.value !== "line",
    mouseEvent,
    mouseEventHook
  );
  hover(mainCanvas, true, mouseEvent, mouseEventHook);

  drawLine(
    mainCanvas,
    () => mouseState.value === "line",
    mouseEvent,
    mouseEventHook
  );
  drawRect(
    mainCanvas,
    () => mouseState.value === "rect",
    mouseEvent,
    mouseEventHook
  );
  drawPolyline(
    mainCanvas,
    () => mouseState.value === "polyline",
    mouseEvent,
    mouseEventHook
  );

  watch(mouseState, (value) => {
    if (value === "rect" || value === "polyline" || value === "line") {
      mainCanvas.style.cursor = "crosshair";
    } else {
      mainCanvas.style.cursor = "auto";
    }
  });

  addNodeToContainer(h(MouseActionPreview), container);
};
