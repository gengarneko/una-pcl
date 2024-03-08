import { useDrama } from '@web3d/hooks/drama';
import { h, watch } from 'vue';
import ToolBox from './components/ToolBox.vue';
import InstanceDetail from './components/InstanceDetail.vue';
import { addNodeToContainer } from '..';
import { rectAction } from './actions/rect';
import { AddBoxOperation } from './operations/AddBoxOperation';
import { storeToRefs } from 'pinia';
import { useBoxStore } from './stores';
import { ModifyBoxOperation } from './operations/ModifyBoxOperation';
import { useHotkeys } from './hotkeys';
import { useSetFocusOnClick } from '@web3d/utils/focus';
import { RBox } from '../../types';
import { TBox } from './three/TBox';

export const usePlugin = () => {
    const { activeTool, toolbox, rightsidebar,
        camera, primaryFrame,
        setupThreeView, onThreeViewChange, onThreeViewConfirm,
        onAdvanceMouseEvent,
        applyOperation } = useDrama();
    const boxesStore = useBoxStore();
    const { focused, draft } = storeToRefs(boxesStore);
    const { boxes } = boxesStore;

    useSetFocusOnClick(focused, boxes, (box: Readonly<TBox>) => box.box);
    watch(focused, setupThreeView);

    onThreeViewChange((value: RBox) => {
        if (focused.value) {
            draft.value = {
                ...focused.value,
                ...value
            };
        }
    });
    onThreeViewConfirm((value: RBox) => {
        if (focused.value) {
            const op = new ModifyBoxOperation(focused.value.uuid, value);
            applyOperation(op);
        }
    });

    onAdvanceMouseEvent((event) => {
        if (activeTool.value === 'rect' && event.type === 'rected') {
            if (primaryFrame.value) {
                const results = rectAction(event.points, camera);
                applyOperation(new AddBoxOperation(primaryFrame.value, results, camera.rotation));
            }
        }
    });

    useHotkeys();

    addNodeToContainer(h(ToolBox), toolbox);
    addNodeToContainer(h(InstanceDetail), rightsidebar);
};