const form = document.getElementById("registration-form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const validations = [
    validateUsername(),
    validateEmail(),
    validatePassword(),
    validateConfirmPassword(),
  ];

  const isFormValid = validations.every((isValid) => isValid === true);

  if (isFormValid) {
    alert("Registration successful!");
    form.reset();

    document.querySelectorAll(".form-group").forEach((group) => {
      group.className = "form-group";
    });
  }
});

function validateUsername() {
  const value = username.value.trim();
  if (value === "") {
    showError(username, "Username is required");
    return false;
  }
  return checkLength(username, 3, 15);
}

function validateEmail() {
  const value = email.value.trim();
  if (value === "") {
    showError(email, "Email is required");
    return false;
  }
  return checkEmail(email);
}

function validatePassword() {
  const value = password.value.trim();
  if (value === "") {
    showError(password, "Password is required");
    return false;
  }
  return checkLength(password, 6, 25);
}

function validateConfirmPassword() {
  const value = confirmPassword.value.trim();
  if (value === "") {
    showError(confirmPassword, "Confirm password is required");
    return false;
  }
  return checkPasswordsMatch(password, confirmPassword);
}

function checkPasswordsMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, "Passwords do not match");
    return false;
  }
  showSuccess(input2);
  return true;
}

function checkEmail(input) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailRegex.test(input.value.trim())) {
    showSuccess(input);
    return true;
  } else {
    showError(input, "Email is not valid");
    return false;
  }
}

function checkLength(input, min, max) {
  const length = input.value.trim().length;
  if (length < min) {
    showError(
      input,
      `${formatFieldName(input)} must be at least ${min} characters.`,
    );
    return false;
  } else if (length > max) {
    showError(
      input,
      `${formatFieldName(input)} must be less than ${max} characters.`,
    );
    return false;
  } else {
    showSuccess(input);
    return true;
  }
}

function formatFieldName(input) {
  if (input.id === "confirmPassword") return "Confirm password";
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

function showError(input, message) {
  const formGroup = input.parentElement;
  formGroup.className = "form-group error";
  const small = formGroup.querySelector("small");
  small.innerText = message;
}

function showSuccess(input) {
  const formGroup = input.parentElement;
  formGroup.className = "form-group success";
}
