import { MaybeRefOrGetter, Ref, toValue } from "vue";
import { usePos } from "./utils";
import { ESP } from "../constants";
import { EventHook, useEventListener } from "@vueuse/core";
import { AdvanceMouseEvent } from "@una-pcl/web3d";

export const drawRect = (
  dom: MaybeRefOrGetter<HTMLElement>,
  enabled: MaybeRefOrGetter<boolean>,
  mouseEvent: Ref<AdvanceMouseEvent>,
  eventHook: EventHook<AdvanceMouseEvent>,
) => {
  let recting = false;

  const condition =
    (func: (event: MouseEvent) => void) => (event: MouseEvent) => {
      toValue(enabled) ? func(event) : null;
    };

  useEventListener(
    dom,
    "mousemove",
    condition((event: MouseEvent) => {
      if (event.button === 0) {
        if (recting) {
          const { x, y } = usePos(event, toValue(dom));
          mouseEvent.value = {
            type: "recting",
            points: [mouseEvent.value.points[0], { x, y }],
          };
        }
      } else {
        recting = false;
      }
    }),
  );

  useEventListener(
    dom,
    "mousedown",
    condition((event: MouseEvent) => {
      if (event.button === 0) {
        recting = true;
        const { x, y } = usePos(event, toValue(dom));
        mouseEvent.value = {
          type: "recting",
          points: [
            { x, y },
            { x, y },
          ],
        };
      }
    }),
  );

  useEventListener(
    dom,
    "mouseup",
    condition((event: MouseEvent) => {
      if (recting) {
        recting = false;
        if (event.button === 0) {
          const { x, y } = usePos(event, toValue(dom));
          const { x: prevX, y: prevY } = mouseEvent.value.points[0];
          if (
            (x - prevX) * (x - prevX) > ESP &&
            (y - prevY) * (y - prevY) > ESP
          ) {
            mouseEvent.value = {
              type: "rected",
              points: [mouseEvent.value.points[0], { x, y }],
            };
            eventHook.trigger(mouseEvent.value);
          }
        } else {
          mouseEvent.value = {
            type: "deprecated",
            points: [],
          };
        }
      }
    }),
  );

  useEventListener(
    dom,
    "mouseleave",
    condition(() => {
      recting = false;
    }),
  );
};
