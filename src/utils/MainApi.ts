import {MovieI} from "./MoviesApi";

export interface RegisterData {
  name: string,
  email: string,
  password: string,
}

export interface LoginData {
  email: string,
  password: string,
}

export interface UpdateData {
  email: string,
  password: string,
}

const handleRequest = async (url: string, options?: RequestInit) => {
  const res = await fetch(`https://api.fogel.movies.nomoredomains.club/${url}`, options);
  if (res.ok) {
    return await res.json();
  }
  const err = await res.json();
  return Promise.reject(err);
}

export const register = (data: RegisterData) => {
  return handleRequest('signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
}

export const login = (data: LoginData) => {
  return handleRequest('signin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
}

export const updateUser = (data: UpdateData) => {
  return handleRequest('users/me', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(data),
  })
}

export function getUser(token: string) {
  return handleRequest('users/me', {
    headers: {
      'Content-Type': 'application/json',
      Authorization : `Bearer ${token}`,
    }
  });
}

export function saveMovie(data: MovieI) {
  return handleRequest('movies', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(data),
  });
}

export function deleteMovie(id: string) {
  return handleRequest(`movies/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
}

export function getMovies() {
  return handleRequest('movies', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
}