import { isValidEmail, isValidPassword, isValidPNR, generatePNR } from '../src/utils/validators';
describe('validators', ()=>{
  test('email validation', ()=>{
    expect(isValidEmail('test@example.com')).toBe(true);
    expect(isValidEmail('bad-email')).toBe(false);
  });
  test('password validation', ()=>{
    expect(isValidPassword('123456')).toBe(true);
    expect(isValidPassword('123')).toBe(false);
  });
  test('PNR validation', ()=>{
    expect(isValidPNR('ABC123')).toBe(true);
    expect(isValidPNR('ab')).toBe(false);
  });
  test('PNR generator produces 6 chars', ()=>{
    const pnr = generatePNR();
    expect(pnr.length).toBe(6);
  });
});
