const year = document.querySelector("[data-number='year']");
const months = document.querySelector("[data-number='months']");
const days = document.querySelector("[data-number='days']");

function calculateAge(year, month, day, date = new Date()) {
  let currentAge = {};
  currentAge.years = date.getFullYear() - year;
  currentAge.months = date.getMonth() + 1 - month;
  currentAge.days = date.getDate() - day;
  if (currentAge.months < 0) {
    currentAge.years = currentAge.years - 1;
    currentAge.months = 12 + currentAge.months;
  }
  if (currentAge.days < 0) {
    currentAge.months = currentAge.months - 1;
    currentAge.days = 30 + currentAge.days;
  }
  return currentAge;
}

module.exports = calculateAge;
