// Підключаємо файл з вашим рішенням
const lib = require('./index.js');
const assert = require('assert');

// Тестова колекція даних
const friends = [
  {
    name: 'Сем',
    gender: 'Чоловіча',
    email: 'sam@example.com',
    favoriteFruit: 'Яблуко'
  },
  {
    name: 'Емілі',
    gender: 'Жіноча',
    email: 'emily@example.com',
    favoriteFruit: 'Банан'
  },
  {
    name: 'Метт',
    gender: 'Чоловіча',
    email: 'matt@example.com',
    favoriteFruit: 'Яблуко'
  },
  {
    name: 'Бред',
    gender: 'Чоловіча',
    email: 'brad@example.com',
    favoriteFruit: 'Банан'
  }
];

let failedTests = 0;

// Допоміжна функція для запуску тестів
function runTest(testFn) {
  try {
    testFn();
  } catch (e) {
    failedTests++;
  }
}

// 1. Перевірка: Якщо передати тільки колекцію, повернеться її копія [cite: 13]
runTest(() => {
  const result = lib.query(friends);
  assert.deepStrictEqual(result, friends);
  assert.notStrictEqual(result, friends); // Має бути саме копія, а не посилання на оригінал
});

// 2. Перевірка: Кілька операцій select відпрацьовують як одна з пересіченими аргументами [cite: 15, 16]
runTest(() => {
  const result = lib.query(
    friends,
    lib.select('name', 'gender', 'email'),
    lib.select('name', 'email')
  );
  assert.strictEqual(Object.keys(result[0]).length, 2);
  assert.strictEqual(result[0].name, 'Сем');
  assert.strictEqual(result[0].email, 'sam@example.com');
  assert.strictEqual(result[0].gender, undefined);
});

// 3. Перевірка: Кілька операцій filterIn відпрацьовують як одна з пересіченими аргументами [cite: 17, 18]
runTest(() => {
  const result = lib.query(
    friends,
    lib.filterIn('favoriteFruit', ['Яблуко', 'Банан', 'Груша']),
    lib.filterIn('favoriteFruit', ['Яблуко', 'Груша'])
  );
  assert.strictEqual(result.length, 2);
  assert.strictEqual(result[0].name, 'Сем');
  assert.strictEqual(result[1].name, 'Метт');
});

// 4. Перевірка: Фільтрація виконується перед вибіркою (можна фільтрувати по полях, яких немає в select) [cite: 19, 20]
runTest(() => {
  const result = lib.query(
    friends,
    lib.select('name', 'email'),
    lib.filterIn('gender', ['Чоловіча'])
  );
  assert.strictEqual(result.length, 3);
  assert.strictEqual(result[0].name, 'Сем');
  assert.strictEqual(result[1].name, 'Метт');
  assert.strictEqual(result[2].name, 'Бред');
  assert.strictEqual(result[0].gender, undefined); // Поле gender не повинно повернутися
});

// 5. Перевірка: Вихідна колекція не повинна змінитися [cite: 12]
runTest(() => {
  const friendsCopy = JSON.parse(JSON.stringify(friends));
  lib.query(
    friends,
    lib.select('name'),
    lib.filterIn('gender', ['Жіноча'])
  );
  assert.deepStrictEqual(friends, friendsCopy);
});

// Виведення результатів згідно з вимогами [cite: 53, 54, 55]
if (failedTests === 0) {
  console.log('All tests passed!');
} else {
  console.log(`Fail ${failedTests} tests!`);
}