import { getById, login, sleep } from './helpers';

describe('Example', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
    await device.setURLBlacklist(['.*firestore.googleapis.com.*']);
  });

  it('should show task', async () => {
    await login();

    await expect(getById('list')).toBeVisible();

    await getById('taskRow').atIndex(4).tap();
    await expect(getById('show')).toBeVisible();
  });

  it('should edit task', async () => {
    await sleep(5000);
    await getById('taskRow').atIndex(4).tap();

    await expect(getById('editIcon')).toBeVisible();
    await getById('editIcon').tap();
  });
});
