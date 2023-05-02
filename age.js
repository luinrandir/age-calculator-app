const years = document.querySelector("[data-number=years]");
const months = document.querySelector("[data-number=months]");
const days = document.querySelector("[data-number=days]");
const validateForm = (formSelector) => {
  const formElement = document.querySelector(formSelector);
  formElement.setAttribute("novalidate", "");
  const dateLessOrEqual = (year, month, day) => {
    const today = new Date();
    if (year > today.getFullYear()) return false;
    if (year < today.getFullYear()) return true;
    if (month <= today.getMonth() + 1 && day <= today.getDate()) return true;
    return false;
  };
  const validationOptions = [
    {
      attribute: "required",
      isValid: (input, section = null) => input.value.trim() !== "",
      errorMessage: "This field is required",
    },
    {
      attribute: "data-day",
      isValid: (input, section = null) => {
        const month =
          section.nextElementSibling.querySelector("input").id === "month"
            ? section.nextElementSibling.querySelector("input")
            : null;
        const year =
          section.nextElementSibling.nextElementSibling.querySelector("input")
            .id === "year"
            ? section.nextElementSibling.nextElementSibling.querySelector(
                "input"
              )
            : null;

        return input.value <= new Date(year.value, month.value, 0).getDate();
      },
      errorMessage: "Must be a valid day",
    },
    {
      attribute: "data-month",
      isValid: (input, section = null) => input.value >= 1 && input.value <= 12,
      errorMessage: "Must be a valid month",
    },
    {
      attribute: "data-year",
      isValid: (input, section = null) => {
        const month =
          section.previousElementSibling.querySelector("input").id === "month"
            ? section.previousElementSibling.querySelector("input")
            : null;
        const day =
          section.previousElementSibling.previousElementSibling.querySelector(
            "input"
          ).id === "day"
            ? section.previousElementSibling.previousElementSibling.querySelector(
                "input"
              )
            : null;
        return (
          input.value >= 1 &&
          dateLessOrEqual(input.value, month.value, day.value)
        );
      },
      errorMessage: "Must be in the past",
    },
  ];
  const validateSingleInput = (section) => {
    let isValid = true;
    const sectionInput = section.querySelector("input");
    const sectionError = section.querySelector("span");
    sectionError.innerText = "";
    for (const option of validationOptions) {
      if (
        sectionInput.hasAttribute(option.attribute) &&
        !option.isValid(sectionInput, section)
      ) {
        sectionError.innerText = option.errorMessage;
        section.parentElement.setAttribute("data-error", "");
        isValid = false;
        break;
      }
    }
    return isValid;
  };

  formElement.addEventListener("submit", (e) => {
    e.preventDefault();
    let validForm = validateInputs(formElement);
    if (validForm) callAPI(formElement);
    console.log(validForm);
  });

  const validateInputs = (formToValidate) => {
    const sections = Array.from(formToValidate.querySelectorAll("section"));
    let formValid = [];
    sections.forEach((section) => formValid.push(validateSingleInput(section)));
    if (formValid.every((currentValue) => currentValue === true)) {
      sections[0].parentElement.removeAttribute("data-error");
      return true;
    }
    return false;
  };
};

const callAPI = (formElement) => {
  const formObject = Array.from(formElement.elements)
    .filter((element) => element.type !== "submit")
    .reduce((acc, element) => ({ ...acc, [element.id]: element.value }), {});
  let results = calculateAge(formObject.year, formObject.month, formObject.day);
  years.innerText = results.years;
  months.innerText = results.months;
  days.innerText = results.days;
};

validateForm("#mainForm");
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
//module.exports = { calculateAge, isLeapYear };
