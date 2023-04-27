const calculateAge = require("./age");

const expectedResults = [
  { years: 32, months: 3, days: 22 },
  { years: 32, months: 0, days: 10 },
  { years: 68, months: 7, days: 12 },
  { years: 18, months: 1, days: 10 },
  { years: 33, months: 0, days: 13 },
  { years: 23, months: 0, days: 18 },
  { years: 24, months: 0, days: 18 },
  { years: 13, months: 1, days: 26 },
  { years: 3, months: 3, days: 18 },
  { years: 1, months: 5, days: 1 },
];
const testInputs = [
  [1990, 1, 3, new Date("4-25-2022")],
  [1975, 12, 23, new Date("1-2-2008")],
  [1954, 5, 13, new Date("12-25-2022")],
  [2000, 8, 22, new Date("10-2-2018")],
  [1977, 9, 5, new Date("9-18-2010")],
  [1999, 2, 24, new Date("3-14-2022")],
  [1998, 2, 24, new Date("3-14-2022")],
  [1989, 6, 30, new Date("8-25-2002")],
  [2010, 2, 3, new Date("5-21-2013")],
  [2004, 4, 15, new Date("9-16-2005")],
];

for (let i in testInputs) {
  test(`Test #${parseInt(i) + 1}`, () => {
    expect(calculateAge(...testInputs[i])).toEqual(expectedResults[i]);
  });
}
