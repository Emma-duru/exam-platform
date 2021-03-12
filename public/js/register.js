// User Registration
const registerForm = document.querySelector("#user-register");

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const firstname = registerForm.firstname.value;
  const lastname = registerForm.lastname.value;
  const email = registerForm.email.value;
  const phone_number = registerForm.phone_number.value;
  const address = registerForm.address.value;
  const password = registerForm.password.value;

  try {
    const res = await fetch("/register", {
      method: "POST",
      body: JSON.stringify({
        firstname,
        lastname,
        email,
        phone_number,
        address,
        password,
      }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();

    if (data.student) {
      location.assign("/");
    }
  } catch (err) {
    console.log(err);
  }
});
