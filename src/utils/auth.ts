const TOKEN_KEY = 'token';
const COMPANY_ID_KEY = 'company_id';
const isLogin = () => {
  return !!localStorage.getItem(TOKEN_KEY);
};

const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

const setToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
};

const clearToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

const setCompanyId = (val: string) => {
  localStorage.setItem(COMPANY_ID_KEY, val);
};

const getCompanyId = () => {
  return localStorage.getItem(COMPANY_ID_KEY) || '';
};

// const setCom

export { isLogin, getToken, setToken, clearToken, setCompanyId, getCompanyId };
