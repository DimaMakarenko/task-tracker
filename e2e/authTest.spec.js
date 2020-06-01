import { getById, correctAuth } from './helpers';

const failAuth = {
  login: 'test@test.com',
  password: '123456',
};

describe('Example', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should show signIn screen tap to signUp and go back ', async () => {
    await expect(getById('signIn')).toBeVisible();
    await getById('toSignUp').tap();
    await expect(getById('signUp')).toBeVisible();
    await getById('toSignIn').tap();
    await expect(getById('signIn')).toBeVisible();
  });

  it('should show error for wrong sign In data', async () => {
    await expect(getById('email')).toBeVisible();
    await getById('email').replaceText(failAuth.login);

    await expect(getById('password')).toBeVisible();
    await getById('password').replaceText(failAuth.password);

    await getById('signInBtn').tap();
    await expect(getById('signInError')).toBeVisible();
  });

  it('should login to application and show tasks list', async () => {
    await getById('email').replaceText(correctAuth.login);
    await getById('password').replaceText(correctAuth.password);
    await getById('signInBtn').tap();

    await expect(getById('tasksList')).toBeVisible();
    await getById('logOut').tap();
  });
});
