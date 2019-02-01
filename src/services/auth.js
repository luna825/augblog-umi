import request from '@/utils/clientRequest';

export async function login(params) {
  return request('/api/v1/token', {
    method: 'POST',
    data: params,
  });
}

export async function logout() {
  return false;
}

export async function fetchCurrentUser() {
  return request('/api/v1/user');
}
