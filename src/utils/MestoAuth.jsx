export const BASE_URL = "https://auth.nomoreparties.co";

const makeRequest = (url, method, body, token) => {
  const options = {
    method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  if (body) options.body = JSON.stringify(body);
  if (token) options.headers.Authorization = `Bearer ${token}`;

  return fetch(`${BASE_URL}${url}`, options).then((response) => {
    return response.ok
      ? response.json()
      : Promise.reject(`Ошибка ${response.status}`);
  });
};

export const registerUser = (password, email) => {
  return makeRequest("/signup", "POST", { password, email }, null);
};

export const authorizeUser = (password, identifier) => {
  return makeRequest("/signin", "POST", { password, identifier }, null);
};

export const getUserData = (token) => {
  return makeRequest("/users/me", "GET", null, token);
};
