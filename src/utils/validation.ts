// валидация телефона (10 или 11 цифр)
export const validatePhone = (phone: string): boolean => {
    const digits = phone.replace(/\D/g, ''); // убирать все кроме цифр
    return digits.length === 10 || digits.length === 11;
  };
  
  // валидация имени (не пустое, минимум 2 буквы)
  export const validateName = (name: string): boolean => {
    return name.trim().length >= 2;
  };