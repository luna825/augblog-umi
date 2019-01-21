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

export async function fetchCurrentUser(token) {
  const authToken = token || localStorage.getItem('aug-blog-user-token');
  return request('/user', {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
}
