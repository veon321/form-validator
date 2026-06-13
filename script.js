const form = document.getElementById("registration-form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");

const elements = [form, username, email, password, confirmPassword];

if (elements.includes(null)) {
  console.error("missing elements in the form");
} else {
  username.addEventListener("blur", checkUsername);
  email.addEventListener("blur", checkEmailField);
  password.addEventListener("blur", checkPasswordField);
  confirmPassword.addEventListener("blur", checkConfirmPasswordField);

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const validations = [
      checkUsername(),
      checkEmailField(),
      checkPasswordField(),
      checkConfirmPasswordField(),
    ];

    if (validations.every(Boolean)) {
      alert("Registration successful!");
      form.reset();

      document.querySelectorAll(".form-group").forEach((group) => {
        group.classList.remove("success", "error");
        const small = group.querySelector("small");
        if (small) small.innerText = "";
      });
    }
  });
}

function showMessage(input, message, isValid) {
  const formGroup = input.parentElement;

  if (!formGroup) {
    console.error("Nie znaleziono rodzica dla elementu:", input);
    return;
  }

  const small = formGroup.querySelector("small");

  if (isValid === true) {
    formGroup.classList.remove("error");
    formGroup.classList.add("success");
    if (small) small.innerText = "";
  } else {
    formGroup.classList.remove("success");
    formGroup.classList.add("error");
    if (small) small.innerText = message;
  }
}

function validateEmpty(input, fieldName) {
  if (input.value.trim() === "") {
    showMessage(input, `${fieldName} is required`, false);
    return false;
  }
  return true;
}

function validateLength(input, min, max, fieldName) {
  const value = input.value.trim();
  if (value.length < min || value.length > max) {
    showMessage(
      input,
      `${fieldName} must be between ${min} and ${max} characters`,
      false,
    );
    return false;
  }
  return true;
}

function checkUsername() {
  if (!validateEmpty(username, "Username")) return false;
  if (!validateLength(username, 3, 15, "Username")) return false;

  showMessage(username, "", true);
  return true;
}

function checkEmailField() {
  if (!validateEmpty(email, "Email")) return false;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value.trim())) {
    showMessage(email, "Email is not valid", false);
    return false;
  }

  showMessage(email, "", true);
  return true;
}

function checkPasswordField() {
  if (!validateEmpty(password, "Password")) return false;
  if (!validateLength(password, 6, 25, "Password")) return false;

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
  if (!passwordRegex.test(password.value.trim())) {
    showMessage(
      password,
      "Password must contain uppercase, lowercase and a number",
      false,
    );
    return false;
  }

  showMessage(password, "", true);
  return true;
}

function checkConfirmPasswordField() {
  if (!validateEmpty(confirmPassword, "Confirm password")) return false;

  if (password.value.trim() !== confirmPassword.value.trim()) {
    showMessage(confirmPassword, "Passwords do not match", false);
    return false;
  }

  showMessage(confirmPassword, "", true);
  return true;
}
