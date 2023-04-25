const year = document.querySelector("[data-number='year']");
const months = document.querySelector("[data-number='months']");
const days = document.querySelector("[data-number='days']");

function calculateAge(year, month, day) {
  return year + month + day;
}

module.exports = calculateAge;
