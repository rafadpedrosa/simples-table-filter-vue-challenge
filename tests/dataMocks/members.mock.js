export const members = [
  {
    id: '1',
    name: 'Jared Brown',
    role: 'Owner',
    projects: 8,
    payment: null,
    limits: {
      weekly: null,
      daily: 8
    },
    time_tracking: 'enabled'
  },
  {
    id: '2',
    name: 'Adrian Goia',
    role: 'Viewer',
    projects: 5,
    payment: null,
    limits: {
      weekly: 50,
      daily: 8
    },
    time_tracking: 'enabled'
  },
  {
    id: '3',
    name: 'Cody Rogers',
    role: 'Viewer',
    projects: 8,
    payment: null,
    limits: {
      weekly: 40,
      daily: null
    },
    time_tracking: 'enabled'
  }
]

export const expected_member_modifications = { dailyDescription: '8:00 / Daily', weeklyDescription: 'No weekly limit', paymentDescription: 'No pay rate / No bill rate' }
