import request from '@/utils/clientRequest';

export async function fetchPosts() {
  return request('/posts');
}

export async function fetchPost(id) {
  return request(`/posts/${id}`);
}

export async function createPost(blog) {
  return request('/posts', {
    method: 'POST',
    data: blog,
  });
}
