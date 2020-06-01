import { getById, login } from './helpers';

describe('Example', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
    await device.setURLBlacklist(['.*firestore.googleapis.com.*']);
  });

  it('should show list of tasks and swipe', async () => {
    await login();

    await expect(getById('list')).toBeVisible();
    await getById('list').swipe('up');
    await getById('list').swipe('down');

    await expect(getById('taskRow').atIndex(0)).toBeVisible();
    await getById('taskRow').atIndex(0).swipe('left');

    await getById('logOut').tap();
  });

  it('should start and pause task', async () => {
    await login();

    await expect(getById('start').atIndex(0)).toBeVisible();
    await getById('start').atIndex(0).tap();
    //
    await expect(getById('pause').atIndex(0)).toBeVisible();
    await getById('pause').atIndex(0).tap();
  });
});
