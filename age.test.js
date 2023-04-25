const calculateAge = require("./age");

test("Quick check to add year, month, date as a + b + c ->", () => {
  expect(calculateAge(1, 2, 3)).toBe(6);
});
