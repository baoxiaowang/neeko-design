import { FormWidget, Widget } from '@/widgets/types';

// eslint-disable-next-line import/prefer-default-export
export const customerTable: FormWidget[] = [
  {
    type: 'form',
    key: 'customer',
    children: [
      {
        type: 'input',
        label: '客户编号',
        key: 'customer_no',
        width: '50',
      },
      {
        type: 'input',
        label: '客户名称',
        key: 'customer_name',
        width: '50',
      },
      {
        type: 'input',
        label: '客户电话',
        key: 'customer_phone',
        width: '50',
      },
      {
        type: 'input',
        label: '客户邮箱',
        key: 'customer_email',
        width: '50',
      },
      {
        type: 'rate',
        label: '客户满意度',
        key: 'customer_satisfy',
      },
      {
        type: 'address',
        label: '客户地址',
        key: 'customer_address',
        width: '50',
        block: 1,
      },
      {
        type: 'subform',
        label: '客户联系人',
        key: 'customer_contacts',
        children: [
          {
            type: 'input',
            key: 'name',
            label: '联系人',
          },
          {
            type: 'input',
            key: 'phone',
            label: '联系方式',
          },
        ],
      },
      {
        type: 'subform',
        label: '跟进记录',
        key: 'customer_review',
        children: [
          {
            type: 'date-picker',
            key: 'time',
            label: '跟进时间',
          },
          {
            type: 'input',
            key: 'remake',
            label: '备注',
          },
        ],
      },
    ] as FormWidget[],
  },
] as FormWidget[];

export const customerTableData = [
  {
    key: '1',
    customer_no: 'no.0000001',
    customer_name: '张三',
    address: '5',
    email: 'jane.doe@example.com',
    customer_contacts: [
      {
        phone: '3131',
        name: '联系人1',
      },
      {
        phone: '151',
        name: '联系人2',
      },
    ],
    customer_review: [
      {
        time: '3131',
        remake: '联系人1',
      },
    ],
  },
  {
    key: '2',
    customer_no: 'no.0000002',
    customer_name: '李四',
    salary: 25000,
    address: '35 Park Road, London',
    email: 'alisa.ross@example.com',
  },
  {
    key: '3',
    customer_no: 'no.0000003',
    customer_name: '王五',
    salary: 22000,
    address: '31 Park Road, London',
    email: 'kevin.sandra@example.com',
  },
  {
    key: '4',
    customer_no: 'no.0000004',
    customer_name: 'Ed Hellen',
    salary: 17000,
    address: '42 Park Road, London',
    email: 'ed.hellen@example.com',
  },
  {
    key: '5',
    customer_no: 'no.0000004',
    customer_name: 'William Smith',
    salary: 27000,
    address: '62 Park Road, London',
    email: 'william.smith@example.com',
  },
];
