/**
 * Виконує запит до колекції.
 * @param {Array} collection - Вихідна колекція
 * @param {...Array} operations - Операції (select, filterIn)
 * @returns {Array} - Відфільтрована та відформатована колекція
 */
function query(collection, ...operations) {
  // 1. Створюємо поверхневу копію об'єктів колекції, щоб не змінювати вихідну [cite: 12]
  let result = collection.map(item => ({ ...item }));

  // 2. Якщо передана лише колекція без операцій, повертаємо її копію [cite: 13]
  if (operations.length === 0) {
    return result;
  }

  // 3. Розділяємо операції на фільтрацію та вибірку
  const filters = operations.filter(op => op[0] === 'filterIn');
  const selects = operations.filter(op => op[0] === 'select');

  // 4. Виконуємо фільтрацію (завжди в першу чергу) [cite: 19]
  if (filters.length > 0) {
    const filterConditions = {};

    // Об'єднуємо кілька операцій filterIn для однакових полів (пересічення значень) [cite: 17, 18]
    for (const [_, field, values] of filters) {
      if (filterConditions[field]) {
        filterConditions[field] = filterConditions[field].filter(v => values.includes(v));
      } else {
        filterConditions[field] = values;
      }
    }

    // Фільтруємо колекцію, зберігаючи порядок елементів [cite: 21]
    result = result.filter(item => {
      for (const field in filterConditions) {
        if (!item.hasOwnProperty(field) || !filterConditions[field].includes(item[field])) {
          return false;
        }
      }
      return true;
    });
  }

  // 5. Виконуємо вибірку полів
  if (selects.length > 0) {
    // Пересікаємо аргументи всіх операцій select [cite: 15, 16]
    let selectedFields = selects[0][1];
    for (let i = 1; i < selects.length; i++) {
      selectedFields = selectedFields.filter(f => selects[i][1].includes(f));
    }

    // Формуємо фінальні об'єкти з вибраними полями
    result = result.map(item => {
      const newItem = {};
      for (const field of selectedFields) {
        // Операція select ігнорує поля, яких не існує в об'єкті [cite: 14]
        if (item.hasOwnProperty(field)) {
          newItem[field] = item[field];
        }
      }
      return newItem;
    });
  }

  return result;
}

/**
 * Операція вибору необхідних полів об'єктів
 * @param {...String} fields - Поля для вибірки
 */
function select(...fields) {
  return ['select', fields];
}

/**
 * Операція фільтрації об'єктів колекції
 * @param {String} property - Назва поля
 * @param {Array} values - Допустимі значення
 */
function filterIn(property, values) {
  return ['filterIn', property, values];
}

module.exports = {
  query,
  select,
  filterIn
};