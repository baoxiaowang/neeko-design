import { InputWidget, Widget } from '@/widgets/types';
import { styleObjToCode } from '@/widgets/utils';

export function createFormData(): Widget[] {
  return [
    {
      type: 'form',
      key: 'form',
      codeStyle: styleObjToCode({
        minHeight: '100%',
      }),
      children: [
        {
          label: '姓名',
          type: 'input',
          key: 'input_1',
        } as InputWidget,
        {
          label: '班级',
          type: 'input',
          key: 'input_2',
        } as InputWidget,
      ],
    },
  ];
}
export function createCustomePage(): Widget[] {
  return [
    {
      type: 'root',
      key: 'root',
      codeStyle: styleObjToCode({
        minHeight: '100vh',
        background: '#f2f3f5',
      }),
      children: [],
    },
  ];
}
