function showLocalizedDate() {
    // Отримуємо вибраний код мови з випадаючого списку
    const lang = document.getElementById('langCode').value;
    const now = new Date();

    // 1. Отримуємо локалізовану назву дня тижня
    let weekday = new Intl.DateTimeFormat(lang, { weekday: 'long' }).format(now);
    weekday = weekday.toLowerCase();

    // 2. Отримуємо день та назву місяця
    const day = now.getDate();
    const month = new Intl.DateTimeFormat(lang, { month: 'long' }).format(now);
    
    // 3. Отримуємо рік
    const year = now.getFullYear();

    // 4. Визначаємо еру
    const eras = {
        'uk': 'нашої ери',
        'en': 'AD'
    };
    const era = eras[lang] || 'AD';

    // 5. Отримуємо час у форматі ГГ:ХХ:СС
    const time = now.toLocaleTimeString(lang, { 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit', 
        hour12: false 
    });

    // Формуємо рядок і записуємо в HTML
    const resultString = `${weekday}, ${day} ${month} ${year} ${era}, ${time}`;
    document.getElementById('currentDate').innerHTML = resultString;
}