import request from '@/utils/clientRequest';

export async function login(params) {
  return request('/token', {
    method: 'POST',
    data: params,
  });
}

export async function logout() {
  return false;
}

export async function fetchCurrentUser() {
  return request('/user');
}
