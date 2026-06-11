const form = document.getElementById("registration-form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");

if (!form || !username || !email || !password || !confirmPassword) {
  console.error("Brakuje wymaganych elementów formularza.");
} else {
  username.addEventListener("blur", validateUsername);
  email.addEventListener("blur", validateEmail);
  password.addEventListener("blur", validatePassword);
  confirmPassword.addEventListener("blur", validateConfirmPassword);

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const validations = [
      validateUsername(),
      validateEmail(),
      validatePassword(),
      validateConfirmPassword(),
    ];

    const isFormValid = validations.every(Boolean);

    if (isFormValid) {
      alert("Registration successful!");

      form.reset();

      document.querySelectorAll(".form-group").forEach((group) => {
        group.classList.remove("success", "error");

        const small = group.querySelector("small");
        if (small) {
          small.innerText = "";
        }
      });
    }
  });
}

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

  return checkPasswordStrength(password);
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
  }

  showError(input, "Email is not valid");
  return false;
}

function checkPasswordStrength(input) {
  const value = input.value.trim();

  if (value.length < 6 || value.length > 25) {
    showError(input, "Password must be between 6 and 25 characters");
    return false;
  }

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;

  if (!passwordRegex.test(value)) {
    showError(
      input,
      "Password must contain at least one uppercase letter, one lowercase letter and one number",
    );
    return false;
  }

  showSuccess(input);
  return true;
}

function checkLength(input, min, max) {
  const length = input.value.trim().length;

  if (length < min) {
    showError(
      input,
      `${formatFieldName(input)} must be at least ${min} characters.`,
    );
    return false;
  }

  if (length > max) {
    showError(
      input,
      `${formatFieldName(input)} cannot exceed ${max} characters.`,
    );
    return false;
  }

  showSuccess(input);
  return true;
}

function formatFieldName(input) {
  if (input.id === "confirmPassword") {
    return "Confirm password";
  }

  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

function showError(input, message) {
  const formGroup = input.parentElement;

  formGroup.classList.remove("success");
  formGroup.classList.add("error");

  const small = formGroup.querySelector("small");

  if (small) {
    small.innerText = message;
  }
}

function showSuccess(input) {
  const formGroup = input.parentElement;

  formGroup.classList.remove("error");
  formGroup.classList.add("success");

  const small = formGroup.querySelector("small");

  if (small) {
    small.innerText = "";
  }
}
