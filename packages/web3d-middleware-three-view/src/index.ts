import { addNodeToContainer, useDrama } from "@una-pcl/web3d";
import ViewComponent from "./components/ViewComponent.vue";
import { useThreeViewStore } from "./stores";
import { h } from "vue";

export const useMiddleware = () => {
  const { container } = useDrama();
  useThreeViewStore();
  addNodeToContainer(h(ViewComponent), container);
};
