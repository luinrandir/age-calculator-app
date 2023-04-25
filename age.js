const year = document.querySelector("[data-number='year']");
const months = document.querySelector("[data-number='months']");
const days = document.querySelector("[data-number='days']");

function calculateAge(year, month, day) {
  let timePassed = {};
  timePassed.years = year;
  timePassed.months = month;
  timePassed.days = day;
  return timePassed;
}

module.exports = calculateAge;
