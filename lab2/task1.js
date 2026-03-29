const obj = {
  className: 'open menu'
};

function addClass(obj, cls) {
  // 1. Розбиваємо рядок класів на масив по пробілу
  let classes = obj.className ? obj.className.split(' ') : [];

  // 2. Перевіряємо, чи вже існує такий клас у масиві
  if (!classes.includes(cls)) {
    // 3. Якщо класу немає, додаємо його в масив
    classes.push(cls);
    
    // 4. З'єднуємо масив назад у рядок через пробіл
    obj.className = classes.join(' ');
  }
}

// --- Перевірка роботи ---
addClass(obj, 'new'); 
addClass(obj, 'open'); // вже є, не додасться
addClass(obj, 'me');

console.log(obj.className); // Виведе: "open menu new me"
