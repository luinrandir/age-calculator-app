const submitButton = document.getElementById("btn");
const form = document.getElementById("mainForm");
const errorSections = document.getElementsByTagName("section");
submitButton.addEventListener("click", (e) => {
  e.preventDefault();
  for (let section in errorSections) {
    errorSections[section].toggleAttribute("data-error");
  }
});

const year = document.querySelector("[data-number='year']");
const months = document.querySelector("[data-number='months']");
const days = document.querySelector("[data-number='days']");

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
