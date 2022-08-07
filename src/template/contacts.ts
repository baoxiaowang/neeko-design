/**
 * 联系人表
 */

import { FormWidget } from '@/widgets/types';

// eslint-disable-next-line import/prefer-default-export
export const contactsTable: FormWidget[] = [
  {
    type: 'form',
    key: 'contacts',
    children: [
      {
        type: 'input',
        label: '联系人姓名',
        key: 'contacts_name',
        width: '50',
      },
      {
        type: 'input',
        label: '性别',
        key: 'contacts_sex',
        width: '50',
      },
      {
        type: 'input',
        label: '职称',
        key: 'contacts_postion',
        width: '50',
      },
      {
        type: 'select',
        label: '关联客户',
        key: 'rely_customer',
        width: '50',
      },
      {
        type: 'textarea',
        label: '备注',
        key: 'contacts_memo',
      },
      {
        type: 'subform',
        label: '联系方式',
        key: 'contacts_channel',
        children: [
          {
            type: 'select',
            label: '渠道',
            key: 'channel_type',
          },
          {
            type: 'input',
            label: '号码',
            key: 'channel_val',
          },
        ],
      },
    ],
  },
];

export const contactsTableData = [
  {
    contacts_name: '联系人1',
    contacts_sex: '0',
    contacts_postion: '',
    rely_customer: '',
    contacts_memo: '测试联系人',
    contacts_channel: [
      {
        channel_type: 'QQ',
        channel_val: '465782548',
      },
      {
        channel_type: '手机号',
        channel_val: '15172381375',
      },
    ],
  },
];
