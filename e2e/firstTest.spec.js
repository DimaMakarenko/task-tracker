describe('Example', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should have signIn screen', async () => {
    await expect(element(by.id('signIn'))).toBeVisible();
  });


});
