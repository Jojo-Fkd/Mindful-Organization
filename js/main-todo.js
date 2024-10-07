const radioInputs = document.querySelectorAll("input[type=radio]");
radioInputs.forEach((input) => {
  if (input.checked === true) {
    input.parentElement.parentElement.classList.add("active");
  }
  input.onclick = () => {
    radioInputs.forEach((input) => {
      input.parentElement.parentElement.classList.remove("active");
      input.checked === false;
    });
    input.parentElement.parentElement.classList.add("active");
  };
});

const todoCards = document.querySelectorAll(".todo");

const workTodo = JSON.parse(localStorage.getItem("workTodo")) || [];
const improvementTodo =
  JSON.parse(localStorage.getItem("improvementTodo")) || [];
const schoolTodo = JSON.parse(localStorage.getItem("schoolTodo")) || [];
const choresTodo = JSON.parse(localStorage.getItem("choresTodo")) || [];

/* RENDERING TODO */

const todoRendering = (todoContainer, todoStorage) => {
  if (todoStorage.length === 0) {
    todoContainer.querySelector("section div p").textContent = "No To-do Set";
  } else {
    todoContainer.querySelector("section").remove();
    for (let i = 0; i < todoStorage.length; i++) {
      const todoObj = todoStorage[i];
      const section = document.createElement("section");
      section.innerHTML = `
              <div>
                <p>${todoObj.todo}</p>
                <input type="checkbox" />
              </div>
                <div class="todo-delete">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    style="fill: rgba(0, 0, 0, 0.8)"
                  >
                    <path
                      d="M5 20a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8h2V6h-4V4a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v2H3v2h2zM9 4h6v2H9zM8 8h9v12H7V8z"
                    ></path>
                    <path d="M9 10h2v8H9zm4 0h2v8h-2z"></path>
                  </svg>
              </div>
    `;
      if (todoObj.checked === true) {
        section.querySelector("div input").checked = true;
        section.querySelector("div input").disabled = true;
        section.className = "checked";
      }
      todoContainer.appendChild(section);
      /* DELETING TODO ITEM */

      const todoDeleteBtn = section.querySelector(".todo-delete");

      todoDeleteBtn.onclick = () => {
        const boolean = confirm("You can not reverse this action");
        if (boolean === true) {
          section.remove();
          todoStorage.splice(i, 1);
          if (todoStorage === workTodo) {
            localStorage.setItem("workTodo", JSON.stringify(workTodo));
          } else if (todoStorage === improvementTodo) {
            localStorage.setItem(
              "improvementTodo",
              JSON.stringify(improvementTodo)
            );
          } else if (todoStorage === schoolTodo) {
            localStorage.setItem("schoolTodo", JSON.stringify(schoolTodo));
          } else if (todoStorage === choresTodo) {
            localStorage.setItem("choresTodo", JSON.stringify(choresTodo));
          }
          location.reload();
        }
      };
    }
  }
};

todoRendering(document.getElementById("work"), workTodo);
todoRendering(document.getElementById("personal_improvement"), improvementTodo);
todoRendering(document.getElementById("school_work"), schoolTodo);
todoRendering(document.getElementById("chores"), choresTodo);

/* ADDING TODO */

const todoForm = document.querySelector("form.todo-bar");
todoForm.onsubmit = (event) => {
  event.preventDefault();
  const todoContent = todoForm.querySelector("input#todo-content").value;
  const newTodo = {
    todo: todoContent,
    checked: false,
  };
  todoCards.forEach((card) => {
    if (card.className === "todo active") {
      if (card.id === "work") {
        workTodo.push(newTodo);
        localStorage.setItem("workTodo", JSON.stringify(workTodo));
        location.reload();
      } else if (card.id === "personal_improvement") {
        improvementTodo.push(newTodo);
        localStorage.setItem(
          "improvementTodo",
          JSON.stringify(improvementTodo)
        );
        location.reload();
      } else if (card.id === "school_work") {
        schoolTodo.push(newTodo);
        localStorage.setItem("schoolTodo", JSON.stringify(schoolTodo));
        location.reload();
      } else if (card.id === "chores") {
        choresTodo.push(newTodo);
        localStorage.setItem("choresTodo", JSON.stringify(choresTodo));
        location.reload();
      }
    }
  });
};

/* CHECKOUT TODO */

todoCards.forEach((todo) => {
  const checkBoxes = todo.querySelectorAll("section div input");
  checkBoxes.forEach((box) => {
    box.onclick = () => {
      const boolean = confirm("this action cannot be reversed.");
      const todoItem = box.parentElement.parentElement;
      if (boolean === true) {
        todoItem.className = true;
        box.disabled = true;
        const todoContainer = todoItem.parentElement;
        if (todoContainer.id === "work") {
          workTodo.forEach((todo) => {
            if (todo.todo === todoItem.querySelector("div p").textContent) {
              todo.checked = true;
              localStorage.setItem("workTodo", JSON.stringify(workTodo));
            }
          });
        } else if (todoContainer.id === "personal_improvement") {
          improvementTodo.forEach((todo) => {
            if (todo.todo === todoItem.querySelector("div p").textContent) {
              todo.checked = true;
              localStorage.setItem(
                "improvementTodo",
                JSON.stringify(improvementTodo)
              );
            }
          });
        } else if (todoContainer.id === "school_work") {
          schoolTodo.forEach((todo) => {
            if (todo.todo === todoItem.querySelector("div p").textContent) {
              todo.checked = true;
              localStorage.setItem("schoolTodo", JSON.stringify(schoolTodo));
            }
          });
        } else if (todoContainer.id === "chores") {
          choresTodo.forEach((todo) => {
            if (todo.todo === todoItem.querySelector("div p").textContent) {
              todo.checked = true;
              localStorage.setItem("choresTodo", JSON.stringify(choresTodo));
            }
          });
        }
        location.reload();
      } else if (boolean === false) {
        box.checked = false;
      }
    };
  });
});
