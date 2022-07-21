import { FunctionalComponent, h } from 'vue';
import { getRenderWidget } from '../../render';
import { CommonPropsOpt } from '../../common/widget-options';

import { WidgetComponents, WidgetCompOptions } from '../../types';

const Column: FunctionalComponent<WidgetCompOptions> = (props) => {
  const { node, state, meta } = props;
  const { children = [], style } = node;
  const childrenWidget = children?.map((item) => {
    const child: WidgetComponents = getRenderWidget(item);
    return h(child, {
      node: item,
      state,
      meta,
    });
  });
  return h(
    'div',
    {
      'data-key': node.key,
      'class': 'widget-column',
      'style': {
        ...style,
        'display': 'flex',
        'flex-direction': 'column',
      },
    },
    childrenWidget
  );
};
Column.props = CommonPropsOpt;
export default Column;
