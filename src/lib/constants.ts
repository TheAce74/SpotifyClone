export const PASSWORD_HAS_LETTER = new RegExp("(?=.*[A-Za-z])");
export const PASSWORD_HAS_NUMBER_OR_SPECIAL = new RegExp("(?=.*[\\d\\W])");

const pattern =
  PASSWORD_HAS_LETTER.source + PASSWORD_HAS_NUMBER_OR_SPECIAL.source;
export const PASSWORD_REGEX = new RegExp(pattern);

export const MONTHS_ARRAY = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

export const MONTHS_OBJECT = {
  January: 0,
  February: 1,
  March: 2,
  April: 3,
  May: 4,
  June: 5,
  July: 6,
  August: 7,
  September: 8,
  October: 9,
  November: 10,
  December: 11,
} as const;
