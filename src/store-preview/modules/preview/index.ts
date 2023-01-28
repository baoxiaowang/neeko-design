import { Widget } from '@/widgets/types';
import { defineStore, StoreDefinition } from 'pinia';

export interface PreviewState {
  selectWidget: Widget | null;
  selectKey: string;
  hoveredKey: string;
  widgetList: Widget[];
  widgetMap: Record<string, Widget>;
  widgetLev: Widget[];
}

// : StoreDefinition<
//   'preview',
//   PreviewState,
//   {
//     setSelectKey: () => void;
//   }
// >
const useDesignStore = defineStore('preview', {
  state: (): PreviewState => ({
    selectWidget: null,
    widgetList: [],
    selectKey: '',
    hoveredKey: '',
    widgetMap: {},
    widgetLev: [],
  }),
  getters: {
    selectWidget(): undefined | Widget {
      return this.widgetMap[this.selectKey];
    },
  },

  actions: {
    syncStore(data: any) {
      this.$patch(data);
    },
    setWidgetList(widgetList: Widget[]) {
      this.$patch({
        widgetList,
      });
    },
    setWidgetMap(data = {}) {
      this.widgetMap = data;
    },
    setSelectKey(key: string) {
      this.selectKey = key;
    },
    setSelectWidget(val: Widget) {
      this.selectWidget = val;
    },
    setHoverKey(key: string) {
      this.hoveredKey = key;
    },
    setWidgetLev(data: Widget[]) {
      this.widgetLev = data;
    },
  },
});

export default useDesignStore;
