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
  return await res.json();
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
    },
    body: JSON.stringify(data),
  })
}

export function getUser(token: string) {
  return handleRequest('users/me', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ${token}`,
    }
  });
}