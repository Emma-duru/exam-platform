const createForm = document.querySelector("#question-create");

createForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = createForm.question.value;
  const A = createForm.A.value;
  const B = createForm.B.value;
  const C = createForm.C.value;
  const D = createForm.D.value;
  const correctAnswer = createForm.correctAnswer.value;
  const examId = createForm.examId.value;

  try {
    const res = await fetch(`/exam/${examId}/question`, {
      method: "POST",
      body: JSON.stringify({ name, A, B, C, D, correctAnswer }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();

    if (data.question) {
      location.assign(`/exam/${examId}`);
    }
  } catch (err) {
    console.log(err);
  }
});

const editForms = document.querySelectorAll(".question-edit");

editForms.forEach((editForm) => {
  editForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = editForm.question.value;
    const A = editForm.A.value;
    const B = editForm.B.value;
    const C = editForm.C.value;
    const D = editForm.D.value;
    const correctAnswer = editForm.correctAnswer.value;
    const examId = editForm.examId.value;
    const questionId = editForm.questionId.value;

    try {
      const res = await fetch(`/exam/${examId}/question/${questionId}`, {
        method: "PUT",
        body: JSON.stringify({ name, A, B, C, D, correctAnswer }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();

      if (data.question) {
        location.assign(`/exam/${examId}`);
      }
    } catch (err) {
      console.log(err);
    }
  });
});

const deleteForms = document.querySelectorAll(".question-delete");

deleteForms.forEach((deleteForm) => {
  deleteForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const examId = deleteForm.examId.value;
    const questionId = deleteForm.questionId.value;

    try {
      const res = await fetch(`/exam/${examId}/question/${questionId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.question) {
        location.assign(`/exam/${examId}`);
      }
    } catch (err) {
      console.log(err);
    }
  });
});
