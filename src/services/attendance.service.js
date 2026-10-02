import { apiRequest } from './api';

export const attendanceService = {
  listMine() { return apiRequest('attendance.mine'); },
  available() { return apiRequest('attendance.available'); },
  submit(activityId, position) {
    return apiRequest('attendance.submit', {
      activityId,
      position: {
        latitude: Number(position.latitude),
        longitude: Number(position.longitude),
        accuracy: Number(position.accuracy),
        timestamp: Number(position.timestamp || Date.now())
      }
    });
  }
};
