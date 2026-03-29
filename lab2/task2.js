function unique(arr) {
  return Array.from(new Set(arr));
}

// Або ще коротший варіант (використовуючи spread-синтаксис):
// function unique(arr) {
//   return [...new Set(arr)];
// }

const strings = ["C++", "C#", "C++",  "C", "C++", "JavaScript", "C++", "JavaScript"];

alert( unique(strings) ); // C++, C#, С#, C, JavaScript