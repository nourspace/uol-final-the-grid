export const users = [
  { id: '1', name: 'John Smith' },
  { id: '2', name: 'Jane Doe' },
  { id: '3', name: 'Bob Johnson' },
]
export const assets = [
  {
    id: '1',
    name: 'Asset 1',
    category: 'Category A',
    notes: 'Some notes about Asset 1',
    website: 'www.asset1.com',
  },
  {
    id: '2',
    name: 'Asset 2',
    category: 'Category B',
    notes: 'Some notes about Asset 2',
    website: 'www.asset2.com',
  },
  {
    id: '3',
    name: 'Asset 3',
    category: 'Category C',
    notes: 'Some notes about Asset 3',
    website: 'www.asset3.com',
  },

]
export const activities = [
  {
    id: '1',
    date: '2022-01-01',
    type: 'Type A',
    asset: assets[0],
    notes: 'Some notes about Activity 1',
    source: 'Source 1',
    user: users[0],
  },
  {
    id: '2',
    date: '2022-02-01',
    type: 'Type B',
    asset: assets[1],
    notes: 'Some notes about Activity 2',
    source: 'Source 2',
    user: users[1],
  },
  {
    id: '3',
    date: '2022-03-01',
    type: 'Type C',
    asset: assets[2],
    notes: 'Some notes about Activity 3',
    source: 'Source 3',
    user: users[2],
  },
]
