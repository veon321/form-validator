const form = document.getElementById("registration-form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");

const elements = [form, username, email, password, confirmPassword];

if (elements.includes(null)) {
  console.error("Brakuje wymaganych elementów formularza.");
} else {
  username.addEventListener("blur", checkUsername);
  email.addEventListener("blur", checkEmailField);
  password.addEventListener("blur", checkPasswordField);
  confirmPassword.addEventListener("blur", checkConfirmPasswordField);

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const isUsernameValid = checkUsername();
    const isEmailValid = checkEmailField();
    const isPasswordValid = checkPasswordField();
    const isConfirmPasswordValid = checkConfirmPasswordField();

    if (
      isUsernameValid &&
      isEmailValid &&
      isPasswordValid &&
      isConfirmPasswordValid
    ) {
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

function checkUsername() {
  if (!validateEmpty(username, "Username")) return false;

  const value = username.value.trim();
  if (value.length < 3 || value.length > 15) {
    showMessage(
      username,
      "Username must be between 3 and 15 characters",
      false,
    );
    return false;
  }

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

  const value = password.value.trim();
  if (value.length < 6 || value.length > 25) {
    showMessage(
      password,
      "Password must be between 6 and 25 characters",
      false,
    );
    return false;
  }

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
  if (!passwordRegex.test(value)) {
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
