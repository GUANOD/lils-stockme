import { getEndOfWeek, getStartOfWeek } from "@mantine/dates";
/**
 *
 * @param date weekDate (optional, defaults to current day)
 * @returns Date array containing start and enf of week respectively
 */
export const getStartEndOfWeek = (full?: boolean, date?: Date) => {
  let startDay = new Date(
    getStartOfWeek(date || new Date(), "monday").setHours(0, 0, 0)
  );
  let endDay = new Date(
    getEndOfWeek(date || new Date(), "monday").setHours(23, 59, 59)
  );

  if (!full) return [startDay, endDay];

  console.log(date);
  console.log(startDay);
  console.log(endDay);

  const fullWeek = [];
  let currDay = startDay;

  while (new Date(currDay.toDateString()) <= new Date(endDay.toDateString())) {
    fullWeek.push(new Date(currDay));
    currDay.setDate(currDay.getDate() + 1);
  }

  return fullWeek;
};

//IF NOT USING MANTINE https://stackoverflow.com/questions/8381427/get-start-date-and-end-date-of-current-week-week-start-from-monday-and-end-with

// export const getStartEndOfWeek = (date?: Date, start?: number) => {
//   start = start || 0;
//   let dateToCalc = date
//     ? new Date(date?.setHours(0, 0, 0))
//     : new Date(new Date().setHours(0, 0, 0));

//   let day = dateToCalc.getDay() - start;
//   let dateToReturn = dateToCalc.getDate() - day;

//   let startDate = new Date(dateToCalc.setDate(dateToReturn));
//   let endDate = new Date(
//     new Date(dateToCalc.setDate(dateToReturn + 6)).setHours(23, 59, 59)
//   );

//   return [startDate, endDate];
// };
