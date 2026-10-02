import { apiRequest } from './api';

export const authService = {
  async login(username, password) {
    const data = await apiRequest('auth.login', { username, password });
    if (data?.token) localStorage.setItem('saka_session_token', data.token);
    return data;
  },
  me() { return apiRequest('auth.me'); },
  async logout() {
    try { await apiRequest('auth.logout'); }
    finally { localStorage.removeItem('saka_session_token'); }
  }
};
