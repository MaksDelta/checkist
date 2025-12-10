export const QUEUE_SECTIONS = [
  { key: 'assigned', label: 'Assigned to me' },
  { key: 'review', label: 'Pending review' },
  { key: 'referrals', label: 'Referrals' },
];

export const ACTIONS = [
  { key: 'submission', label: 'New Submission' },
  { key: 'quote', label: 'Quote builder' },
  { key: 'models', label: 'Risk Models' },
  { key: 'upload', label: 'Documents Upload' },
];

export const ACCOUNTS_ACTIONS = [
  { key: 'filter', label: 'Filter' },
  { key: 'sort', label: 'Sort' },
  { key: 'group', label: 'Group' },
  { key: 'new', label: '+New' },
];

export const GOALS = [
  {
    name: 'PORTFOLIO LOSS RATIO TARGET',
    parts: [
      { value: 35, color: '#52c41a', label: '' },
      { value: 20, color: '#faad14', label: '' },
      { value: 45, color: '#ff4d4f', label: '' },
    ],
  },
  {
    name: 'RENEWAL RETENTION',
    parts: [
      { value: 18, color: '#ff4d4f', label: '' },
      { value: 30, color: '#faad14', label: '' },
      { value: 12, color: '#52c41a', label: '' },
      { value: 40, color: '#faad14', label: '' },
    ],
  },
  {
    name: 'NEW BUISNES TARGET',
    parts: [{ value: 52, color: '#1890ff', label: '$8.1' }],
  },
  {
    name: 'ANNUAL TWG TARGET',
    parts: [{ value: 43, color: '#1890ff', label: '$28.1' }],
  },
];