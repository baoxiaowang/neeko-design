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
const useDesignStore: StoreDefinition<'preview', PreviewState> = defineStore(
  'preview',
  {
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
      setSelectKey(key) {
        this.selectKey = key;
      },
      setSelectWidget(val) {
        this.selectWidget = val;
      },
      setHoverKey(key) {
        this.hoveredKey = key;
      },
      setWidgetLev(data) {
        this.widgetLev = data;
      },
    },
  }
);

export default useDesignStore;
