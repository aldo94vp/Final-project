import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

 API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }

  return req;
});

export const fetchPosts = () => API.get('api/posts');
export const createPost = (newPost) => API.post('api/posts', newPost);
export const likePost = (id) => API.patch(`api/posts/${id}/likePost`);
export const updatePost = (id, updatedPost) => API.patch(`api/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`api/posts/${id}`);

export const signIn = (formData) => API.post('api/users/signin', formData);
export const signUp = (formData) => API.post('api/users/signup', formData);

export const fetchNovelties = () => API.get('api/novelties');
export const createNovelty = (newNovelty) => API.post('api/novelties', newNovelty);