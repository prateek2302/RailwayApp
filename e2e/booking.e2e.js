describe('Railway Booking Flow', ()=>{
  beforeAll(async ()=>{ await device.launchApp(); });
  it('should login and book a ticket', async ()=>{
    await expect(element(by.text('Railway Login'))).toBeVisible();
    await element(by.id('emailInput')).typeText('test@example.com');
    await element(by.id('passwordInput')).typeText('password123');
    await element(by.id('loginButton')).tap();

    await expect(element(by.text('Book Train Ticket'))).toBeVisible();
    await element(by.id('searchButton')).tap();

    await expect(element(by.text('Book Now')).atIndex(0)).toBeVisible();
    await element(by.text('Book Now')).atIndex(0).tap();

    await element(by.id('passengerNameInput')).typeText('John Doe');
    await element(by.id('confirmBookingButton')).tap();

    await expect(element(by.text('My Tickets'))).toBeVisible();
  });

  it('should view, download pdf and cancel ticket', async ()=>{
    await element(by.text('My Tickets')).tap();
    await element(by.text('PNR:')).atIndex(0).tap();
    await expect(element(by.id('downloadPdfButton'))).toBeVisible();
    await element(by.id('downloadPdfButton')).tap();
    await element(by.id('cancelButton')).tap();
  });
});
