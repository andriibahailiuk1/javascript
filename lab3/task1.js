function showCurrentDateTime() {
    // Створюємо масиви для правильного відмінювання місяців та днів тижня
    const months = [
        "січня", "лютого", "березня", "квітня", "травня", "червня",
        "липня", "серпня", "вересня", "жовтня", "листопада", "грудня"
    ];
    
    const daysOfWeek = [
        "неділя", "понеділок", "вівторок", "середа", "четвер", "п'ятниця", "субота"
    ];

    // Отримуємо поточний об'єкт дати і часу
    const now = new Date();

    // Витягуємо день, місяць, рік та день тижня
    const day = now.getDate();
    const month = months[now.getMonth()];
    const year = now.getFullYear();
    const weekDay = daysOfWeek[now.getDay()];

    // Витягуємо години та хвилини. padStart(2, '0') додає нуль, якщо число менше 10 (наприклад, 08 замість 8)
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');

    // Формуємо рядок s з використанням HTML-тегів <br> для переносу рядків
    let s = `Дата:<br>${day} ${month} ${year} року<br>День тижня: ${weekDay}<br>Час: ${hours}:${minutes}`;

    // Знаходимо елемент на сторінці та записуємо в нього результат
    let elem = document.getElementById('currentDate');
    elem.innerHTML = s;
}