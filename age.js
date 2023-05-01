const years = document.querySelector("[data-number='year']");
const months = document.querySelector("[data-number='months']");
const days = document.querySelector("[data-number='days']");
const inputYear = document.getElementById("year");
const inputMonth = document.getElementById("month");
const inputDay = document.getElementById("day");
const errorYear = document.getElementById("errorYear");
const errorMonth = document.getElementById("errorMonth");
const errorDay = document.getElementById("errorDay");
const submitButton = document.getElementById("btn");
submitButton.addEventListener("click", (e) => {
  e.preventDefault();
  let calcAge = calculateAge(inputYear.value, inputMonth.value, inputDay.value);
  years.innerText = calcAge.years;
  months.innerText = calcAge.months;
  days.innerText = calcAge.days;
});

function calculateAge(birthYear, birthMonth, birthDate, today = new Date()) {
  let currentYear = today.getFullYear();
  let currentMonth = today.getMonth() + 1;
  let currentDate = today.getDate();
  let currentAge = {};

  const daysPerMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (currentDate < birthDate) {
    currentMonth = currentMonth - 1;
    currentAge.days =
      currentDate +
      daysPerMonth[currentMonth === 0 ? 11 : currentMonth - 1] -
      birthDate;
    currentAge.days =
      isLeapYear(currentYear) && currentMonth >= 2
        ? currentAge.days + 1
        : currentAge.days;
  } else {
    currentAge.days = currentDate - birthDate;
  }
  if (currentMonth < birthMonth) {
    currentYear = currentYear - 1;
    currentAge.months = currentMonth + 12 - birthMonth;
  } else {
    currentAge.months = currentMonth - birthMonth;
  }
  currentAge.years = currentYear - birthYear;
  return currentAge;
}

function isLeapYear(currentYear) {
  if (currentYear % 4 === 0) return true;
  if (currentYear % 100 === 0) {
    return currentYear % 400 === 0;
  }
  return false;
}
module.exports = { calculateAge, isLeapYear };
