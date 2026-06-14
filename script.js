const form = document.getElementById("registration-form");

const fieldsConfig = {
  username: { validate: checkUsername },
  email: { validate: checkEmailField },
  password: { validate: checkPasswordField },
  confirmPassword: { validate: checkConfirmPasswordField },
};

if (!form) {
  console.error("Brakuje formularza na stronie.");
} else {
  Object.keys(fieldsConfig).forEach((id) => {
    const element = document.getElementById(id);
    if (element && element.tagName === "INPUT") {
      element.addEventListener("blur", fieldsConfig[id].validate);
    }
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const validations = Object.values(fieldsConfig).map((field) =>
      field.validate(),
    );

    if (validations.every(Boolean)) {
      alert("Registration successful!");
      form.reset();
      resetFormVisuals();
    }
  });
}

function isNotEmpty(value) {
  return value.trim() !== "";
}

function isLengthBetween(value, min, max) {
  const length = value.trim().length;
  return length >= min && length <= max;
}

function checkUsername() {
  const input = document.getElementById("username");
  const value = input.value;

  if (!isNotEmpty(value)) {
    showMessage(input, "Username is required", false);
    return false;
  }
  if (!isLengthBetween(value, 3, 15)) {
    showMessage(input, "Username must be between 3 and 15 characters", false);
    return false;
  }

  showMessage(input, "", true);
  return true;
}

function checkEmailField() {
  const input = document.getElementById("email");
  const value = input.value;

  if (!isNotEmpty(value)) {
    showMessage(input, "Email is required", false);
    return false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(value.trim())) {
    showMessage(input, "Email is not valid", false);
    return false;
  }

  showMessage(input, "", true);
  return true;
}

function checkPasswordField() {
  const input = document.getElementById("password");
  const value = input.value;

  if (!isNotEmpty(value)) {
    showMessage(input, "Password is required", false);
    return false;
  }
  if (!isLengthBetween(value, 6, 25)) {
    showMessage(input, "Password must be between 6 and 25 characters", false);
    return false;
  }

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
  if (!passwordRegex.test(value.trim())) {
    showMessage(
      input,
      "Password must contain uppercase, lowercase and a number",
      false,
    );
    return false;
  }

  showMessage(input, "", true);
  return true;
}

function checkConfirmPasswordField() {
  const input = document.getElementById("confirmPassword");
  const passwordInput = document.getElementById("password");
  const value = input.value;

  if (!isNotEmpty(value)) {
    showMessage(input, "Confirm password is required", false);
    return false;
  }
  if (passwordInput.value.trim() !== value.trim()) {
    showMessage(input, "Passwords do not match", false);
    return false;
  }

  showMessage(input, "", true);
  return true;
}

function showMessage(input, message, isValid) {
  const formGroup = input.parentElement;
  formGroup?.classList.toggle("success", isValid);
  formGroup?.classList.toggle("error", !isValid);

  const small = formGroup?.querySelector("small");
  if (small) {
    small.innerText = isValid ? "" : message;
  }
}

function resetFormVisuals() {
  document.querySelectorAll(".form-group").forEach((group) => {
    group.classList.remove("success", "error");
    const small = group.querySelector("small");
    if (small) small.innerText = "";
  });
}
