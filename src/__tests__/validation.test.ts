import { describe, it, expect } from 'vitest';
import { validatePhone, validateName } from '../utils/validation';

describe('Валидация телефона', () => {
  
  it('должен принимать 10 цифр', () => {
    expect(validatePhone('9123456789')).toBe(true);
  });

  it('должен принимать 11 цифр', () => {
    expect(validatePhone('89123456789')).toBe(true);
  });

  it('должен игнорировать скобки, пробелы и плюс', () => {
    expect(validatePhone('+7 (999) 123-45-67')).toBe(true);
  });

  it('должен отклонять 9 цифр', () => {
    expect(validatePhone('123456789')).toBe(false);
  });

  it('должен отклонять пустую строку', () => {
    expect(validatePhone('')).toBe(false);
  });

  it('должен отклонять буквы вместо цифр', () => {
    expect(validatePhone('abc')).toBe(false);
  });
});

describe('Валидация имени', () => {
  
  it('должен принимать имя из 2 букв', () => {
    expect(validateName('Ан')).toBe(true);
  });

  it('должен принимать имя из многих букв', () => {
    expect(validateName('Анна')).toBe(true);
  });

  it('должен отклонять имя из 1 буквы', () => {
    expect(validateName('А')).toBe(false);
  });

  it('должен отклонять пустое имя', () => {
    expect(validateName('')).toBe(false);
  });

  it('должен отклонять имя из пробелов', () => {
    expect(validateName('   ')).toBe(false);
  });

  it('должен обрезать пробелы по краям', () => {
    expect(validateName('  Анна  ')).toBe(true);
  });
});