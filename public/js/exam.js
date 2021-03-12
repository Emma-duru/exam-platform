const createForm = document.querySelector("#exam-create");

createForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = createForm.examName.value;
  const status = createForm.status.value;

  try {
    const res = await fetch("/exam", {
      method: "POST",
      body: JSON.stringify({ name, status }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();

    if (data.exam) {
      location.assign("/exam");
    }
  } catch (err) {
    console.log(err);
  }
});

const editForms = document.querySelectorAll(".exam-edit");

editForms.forEach((editForm) => {
  editForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = editForm.examName.value;
    const id = editForm.id.value;
    const status = editForm.status.value;

    try {
      const res = await fetch(`/exam/${id}`, {
        method: "PUT",
        body: JSON.stringify({ name, status }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (data.exam) {
        location.assign("/exam");
      }
    } catch (err) {
      console.log(err);
    }
  });
});

const deleteForms = document.querySelectorAll(".exam-delete");

deleteForms.forEach((deleteForm) => {
  deleteForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const id = deleteForm.id.value;

    try {
      const res = await fetch(`/exam/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.exam) {
        location.assign("/exam");
      }
    } catch (err) {
      console.log(err);
    }
  });
});

const searchForm = document.querySelector("#exam-search");

searchForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const examName = searchForm.examName.value;

  try {
    location.assign(`/exam/search/?examName=${examName}`);
  } catch (err) {
    console.log(err);
  }
});
