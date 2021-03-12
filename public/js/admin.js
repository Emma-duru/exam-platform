// Create an Admin
const createForm = document.querySelector("#admin-create");

createForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const firstname = createForm.firstname.value;
  const lastname = createForm.lastname.value;
  const email = createForm.email.value;
  const phone_number = createForm.phone_number.value;
  const address = createForm.address.value;
  const password = createForm.password.value;

  try {
    const res = await fetch("/admin", {
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

    if (data.admin) {
      location.assign("/admin");
    }
  } catch (err) {
    console.log(err);
  }
});

// Edit the Admin
const editForms = document.querySelectorAll(".admin-edit");

editForms.forEach((editForm) => {
  editForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const firstname = editForm.firstname.value;
    const lastname = editForm.lastname.value;
    const email = editForm.email.value;
    const phone_number = editForm.phone_number.value;
    const address = editForm.address.value;
    const id = editForm.id.value;

    try {
      const res = await fetch(`/admin/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          firstname,
          lastname,
          email,
          phone_number,
          address,
          id,
        }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();

      if (data.admin) {
        location.assign("/admin");
      }
    } catch (err) {
      console.log(err);
    }
  });
});

// Delete the Admin
const deleteForms = document.querySelectorAll(".admin-delete");

deleteForms.forEach((deleteForm) => {
  deleteForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const id = deleteForm.id.value;

    try {
      const res = await fetch(`/admin/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.admin) {
        location.assign("/admin");
      }
    } catch (err) {
      console.log(err);
    }
  });
});

// Search an Admin
const searchForm = document.querySelector("#admin-search");

searchForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const adminName = searchForm.adminName.value;

  try {
    location.assign(`/admin/search?adminName=${adminName}`);
  } catch (err) {
    console.log(err);
  }
});
