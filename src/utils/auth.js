export const getAuthToken = () => {
  return localStorage.getItem('token');
};

export const getUserRole = () => {
  return localStorage.getItem('role');
};

export const getUserName = () => {
  return localStorage.getItem('username');
};

export const setAuthData = (token, role, username) => {
  localStorage.setItem('token', token);
  localStorage.setItem('role', role);
  if (username) localStorage.setItem('username', username);
};

export const clearAuthData = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('role');
  localStorage.removeItem('username');
};

export const isAuthenticated = () => {
  return !!getAuthToken();
};
