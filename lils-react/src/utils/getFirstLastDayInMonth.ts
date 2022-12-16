export const getFirstLastDayInMonth = (date: Date) => {
  let year = date.getFullYear();
  let month = date.getMonth();
  let monthFirst = new Date(year, month + 1, 0);
  let daysInMonth = monthFirst.getDate();

  return [
    new Date(year, month, 1, 0, 0, 0),
    new Date(year, month, daysInMonth, 23, 59, 59, 999),
  ];
};
