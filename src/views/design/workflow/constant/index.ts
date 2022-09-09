// eslint-disable-next-line no-shadow
export type FlowNodeType =
  | 'start'
  | 'end'
  | 'approve'
  | 'action'
  | 'condition'
  | 'branch'
  | 'cc';
export interface FlowNode {
  preUid: string | '-1'; // 上一个节点id
  uid: string; // 节点id
  type: FlowNodeType;
  title?: string;
  data?: Record<string, any>;
  conditionId?: string | null;
  branchList?: FlowNode[];
  next?: any;
}

export interface FlowConfig {
  title: string;
  color?: string;
  key: FlowNodeType;
  icon?: string;
}

export const flowNodeMap: Record<FlowNodeType, FlowConfig> = {
  start: {
    key: 'start',
    title: '开始节点',
    color: 'rgb(255, 148, 62)',
  },
  end: {
    key: 'end',
    title: '结束节点',
  },
  approve: {
    key: 'approve',
    title: '审批节点',
    color: 'rgb(255, 148, 62)',
    icon: 'icon-stamp',
  },
  cc: {
    key: 'cc',
    title: '抄送节点',
    color: '#3296FA',
    icon: 'icon-send',
  },
  action: {
    key: 'action',
    title: '动作节点',
    color: '#f53f3f',
    icon: 'icon-robot-add',
  },
  condition: {
    key: 'condition',
    title: '条件节点',
    icon: 'icon-branch',
    color: '#15BC83',
  },
  branch: {
    key: 'branch',
    title: '条件分支',
  },
};

// export const defaultData: FlowNode = {};
export const flowNodeList: FlowNode[] = [
  {
    preUid: '-1',
    uid: 'start_1',
    type: 'start',
    data: {},
  },
  {
    preUid: 'start_1',
    uid: 'end_1',
    type: 'end',
    data: {},
  },
  // {
  //   preUid: 'start_1',
  //   uid: 'approve_1',
  //   type: 'start',
  //   title: '审批节点',
  //   data: {},
  // },
];
// {
//   uid: 'start_1',
//   type: 'start',
//   data: {},
//   next: {
//     uid: 'condition_1',
//     type: 'condition',
//     data: {},
//     branchList: [
//       {
//         uid: 'branch_1',
//         title: '分支1',
//         type: 'branch',
//         data: {},
//       },
//       {
//         uid: 'branch_2',
//         title: '分支2',
//         type: 'branch',
//         data: {},
//       },
//       {
//         uid: 'branch_3',
//         title: '分支3',
//         type: 'branch',
//         data: {},
//       },
//     ],
//     next: {
//       uid: 'end_1',
//       type: 'end',
//       data: {},
//       next: null,
//     },
//   },
// };

export const a = 1;
