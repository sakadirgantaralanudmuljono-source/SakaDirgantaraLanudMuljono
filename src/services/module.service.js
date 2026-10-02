import { apiRequest } from './api';

export const moduleService = {
  dashboard: () => apiRequest('dashboard.get'),
  members: () => apiRequest('members.list'),
  activities: () => apiRequest('activities.list'),
  attendance: () => apiRequest('attendance.list'),
  assessments: () => apiRequest('assessments.list'),
  cash: () => apiRequest('cash.list'),
  inventory: () => apiRequest('inventory.list'),
  letters: () => apiRequest('letters.list'),
  structure: () => apiRequest('structure.list'),
  users: () => apiRequest('users.list'),
  maintenance: () => apiRequest('maintenance.get'),
  profile: () => apiRequest('profile.get')
};
