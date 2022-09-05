// eslint-disable-next-line no-shadow
export type FlowNodeType =
  | 'start'
  | 'end'
  | 'approval'
  | 'action'
  | 'condition'
  | 'branch';
export interface FlowNode {
  uid: string;
  type: FlowNodeType;
  title?: string;
  data: Record<string, any>;
  next?: FlowNode | null;
  branchList?: FlowNode[];
}

export interface FlowConfig {
  title: string;
}

export const flowNodeMap: Record<FlowNodeType, FlowConfig> = {
  start: {
    title: '开始节点',
  },
  end: {
    title: '结束节点',
  },
  approval: {
    title: '审批节点',
  },
  action: {
    title: '动作节点',
  },
  condition: {
    title: '条件节点',
  },
  branch: {
    title: '条件分支',
  },
};

export const defaultData: FlowNode = {
  uid: 'start_1',
  type: 'start',
  data: {},
  next: {
    uid: 'condition_1',
    type: 'condition',
    data: {},
    branchList: [
      {
        uid: 'branch_1',
        title: '分支1',
        type: 'branch',
        data: {},
      },
      {
        uid: 'branch_2',
        title: '分支2',
        type: 'branch',
        data: {},
      },
      {
        uid: 'branch_3',
        title: '分支3',
        type: 'branch',
        data: {},
      },
    ],
    next: {
      uid: 'end_1',
      type: 'end',
      data: {},
      next: null,
    },
  },
};

export const a = 1;
