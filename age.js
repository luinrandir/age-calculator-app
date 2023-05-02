const validateForm = (formSelector) => {
  const formElement = document.querySelector(formSelector);
  formElement.setAttribute("novalidate", "");
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
      isValid: (input, section = null) =>
        input.value >= 1 && input.value < new Date().getFullYear(),
      errorMessage: "Must be in the past",
    },
  ];
  const validateSingleInput = (section) => {
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
        break;
      }
    }
  };

  formElement.addEventListener("submit", (e) => {
    e.preventDefault();
    validateInputs(formElement);
    console.log("It worked");
  });

  const validateInputs = (formToValidate) => {
    const sections = Array.from(formToValidate.querySelectorAll("section"));
    sections.forEach((section) => validateSingleInput(section));
  };
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
