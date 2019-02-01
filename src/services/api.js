import request from '@/utils/clientRequest';

export async function fetch(url) {
  return request(url);
}

export async function fetchPost(id) {
  return request(`/api/v1/posts/${id}`);
}

export async function createPost(blog) {
  return request('/api/v1/posts', {
    method: 'POST',
    data: blog,
  });
}

export async function editPost(blog, id) {
  return request(`/api/v1/posts/${id}`, {
    method: 'PUT',
    data: blog,
  });
}

export async function fetchPostsOfUser(userId) {
  return request(`/api/v1/users/${userId}/posts`);
}

export async function deletePost(postId) {
  return request(`/api/v1/posts/${postId}`, {
    method: 'DELETE',
  });
}
