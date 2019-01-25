import request from '@/utils/clientRequest';

export async function fetchPosts() {
  return request('/posts');
}

export async function fetchPost(id) {
  return request(`/posts/${id}`);
}

export async function createPost(blog, token) {
  const authToken = token || localStorage.getItem('aug-blog-user-token');
  return request('/posts', {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
    method: 'POST',
    data: blog,
  });
}
