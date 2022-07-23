import { InputWidget, Widget } from '@/widgets/types';
import { styleObjToCode } from '@/widgets/utils';

const temp1 = [
  {
    type: 'root',
    key: 'root',
    codeStyle: '{\n\tmin-height:100vh;\n\tbackground:#f2f3f5;\n}',
    children: [
      {
        type: 'container',
        key: 'container_yZkb',
        codeStyle:
          '{\n  width: 100%;\n  min-height: 200px;\n  position: relative;\n  display: flex;\n  align-items: center;\n  background-image: url(https://img.alicdn.com/tfs/TB1rHgL4QY2gK0jSZFgXXc5OFXa-2360-400.png);\n  background-repeat: no-repeat; \n  background-size: cover;\n  background-position: right;\n  margin-bottom: 12px;\n  border-radius: 8px\n}',
        config: {},
        children: [
          {
            type: 'text',
            key: 'text_4laq',
            config: { text: '资产管理' },
            codeStyle:
              '{\n  position: absolute;\n  width: 40%;\n  font-size: 40px;\n  line-height: 56px;\n  color: #ffffff;\n  text-overflow: -o-ellipsis-lastline;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  display: -webkit-box;\n  -webkit-line-clamp: 2;\n  line-clamp: 2;\n  -webkit-box-orient: vertical;\n  margin: 16px;\n}',
          },
        ],
      },
      {
        type: 'row',
        key: 'row_t55b',
        title: '行块',
        codeStyle: '',
        config: {},
        children: [
          {
            type: 'container',
            key: 'container_BoUD',
            codeStyle:
              '{\n  width: calc(33.3% - 7px);\n  background: #FFF;\n  height: 116px;\n  padding: 20px;\n  box-sizing: border-box;\n}',
            config: {},
            children: [
              {
                type: 'row',
                key: 'row_uViZ',
                title: '行块',
                codeStyle: '{\n  align-items: center;\n}',
                config: {},
                children: [
                  {
                    type: 'column',
                    key: 'column_np1b',
                    title: '列块',
                    codeStyle:
                      '{\n  height: 100%;\n  justify-content: space-between;\n}',
                    config: {},
                    children: [
                      {
                        type: 'text',
                        key: 'text_AiK1',
                        config: { text: '待我处理' },
                        codeStyle: '',
                      },
                      {
                        type: 'text',
                        key: 'text_KycD',
                        config: { text: '21' },
                        codeStyle:
                          '{\n  font-size: 32px;\n  color: #1f3858;\n  line-height: 42px;\n}',
                      },
                    ],
                  },
                  {
                    type: 'image',
                    key: 'image_1wGf',
                    title: '图片',
                    codeStyle: '{\n  height: 48px;\n  width: 48px;\n}',
                    config: {
                      url: 'https://img.alicdn.com/tfs/TB1H9UJ4FT7gK0jSZFpXXaTkpXa-200-200.png',
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];

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
  return temp1 as Widget[];
  // return [
  //   {
  //     type: 'root',
  //     key: 'root',
  //     codeStyle: styleObjToCode({
  //       minHeight: '100vh',
  //       background: '#f2f3f5',
  //     }),
  //     children: [],
  //   },
  // ];
}
