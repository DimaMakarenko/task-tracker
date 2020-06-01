export const getById = (id) => element(by.id(id));
export const getByText = (text) => element(by.text(text));

export const sleep = (duration) => new Promise((resolve) => setTimeout(() => resolve(), duration));

export const correctAuth = {
  login: 'q@qq.qq',
  password: '111111',
};

export const login = async () => {
  await getById('email').replaceText(correctAuth.login);
  await getById('password').replaceText(correctAuth.password);
  await getById('signInBtn').tap();
};
