const popUpContainer = document.querySelector(".popup-container");

/* CURRENT GOALS SECTION */

const currentGoals = document.getElementById("current_goals");
const savedGoalsToDoArray =
  JSON.parse(localStorage.getItem("goalsToDoArray")) || [];
if (savedGoalsToDoArray.length === 0) {
  currentGoals.querySelector("article").textContent = "No Goals Set";
} else {
  currentGoals.querySelector("article").remove();
  for (let i = 0; i < savedGoalsToDoArray.length; i++) {
    goalTodo = savedGoalsToDoArray[i];

    const newTodo = document.createElement("article");
    newTodo.innerHTML = `
            <p>${goalTodo.todo}</p>
            <div>
              <input type="checkbox" />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                style="fill: rgba(0, 0, 0, 1)"
              >
              <path
                d="M5 20a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8h2V6h-4V4a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v2H3v2h2zM9 4h6v2H9zM8 8h9v12H7V8z"
              ></path>
              <path d="M9 10h2v8H9zm4 0h2v8h-2z"></path>
              </svg>
            </div>
          `;

    if (goalTodo.checked === true) {
      newTodo.className = "checked";
      newTodo.querySelector("div input").checked = true;
      newTodo.querySelector("div input").disabled = true;
    } else {
      newTodo.className = "";
      newTodo.querySelector("div input").checked = false;
    }

    currentGoals.appendChild(newTodo);

    /* DELETING TODO ITEM */

    const goalsDeleteBtn = newTodo.querySelector("svg");

    goalsDeleteBtn.onclick = () => {
      const boolean = confirm("You can not reverse this action");
      if (boolean === true) {
        newTodo.remove();
        savedGoalsToDoArray.splice(i, 1);
        localStorage.setItem(
          "goalsToDoArray",
          JSON.stringify(savedGoalsToDoArray)
        );
        location.reload();
      } else {
        return;
      }
    };
  }
}

/* ADDING TODO */

const addToDoBtn = currentGoals.querySelector("h2 svg");
addToDoBtn.onclick = () => {
  let addPrompt = prompt("Input Your New Goal");
  if (addPrompt) {
    let newToDoObj = {
      todo: addPrompt,
      checked: false,
    };
    savedGoalsToDoArray.push(newToDoObj);
    localStorage.setItem("goalsToDoArray", JSON.stringify(savedGoalsToDoArray));
    location.reload();
  } else {
    return;
  }
};

/* CHECKING OUT A TODO ITEM */

const checkOutBox = currentGoals.querySelectorAll("article div input");

checkOutBox.forEach((box) => {
  box.onclick = () => {
    const boolean = confirm("You can not reverse this action");
    const todoItem = box.parentElement.parentElement;
    if (boolean === true) {
      todoItem.className = "checked";
      box.disabled = true;
      savedGoalsToDoArray.forEach((todo) => {
        if (todo.todo === todoItem.querySelector("p").textContent) {
          todo.checked = true;
          localStorage.setItem(
            "goalsToDoArray",
            JSON.stringify(savedGoalsToDoArray)
          );
        }
      });
    } else if (boolean === false) {
      box.checked = false;
    }
  };
});

/* BIBLE VERSES DISPLAY SECTION */

const bibleVerses = document.getElementById("verses");
const savedBiblesArray = JSON.parse(localStorage.getItem("biblesArray")) || [];
if (savedBiblesArray.length === 0) {
  bibleVerses.querySelector("article").textContent = "No Verses Set";
} else {
  bibleVerses.querySelector("article").remove();
  for (let i = 0; i < savedBiblesArray.length; i++) {
    verse = savedBiblesArray[i];

    const newVerse = document.createElement("article");
    newVerse.innerHTML = `
            <p>${verse.verse}</p>
            <div>
              <button>view</button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                viewBox="0 0 24 24"
                style="fill: rgba(0, 0, 0, 1)"
              >
              <path
                d="M5 20a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8h2V6h-4V4a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v2H3v2h2zM9 4h6v2H9zM8 8h9v12H7V8z"
              ></path>
              <path d="M9 10h2v8H9zm4 0h2v8h-2z"></path>
              </svg>
            </div>
          `;

    bibleVerses.appendChild(newVerse);

    /* DELETING VERSE */

    const goalsDeleteBtn = newVerse.querySelector("svg");

    goalsDeleteBtn.onclick = () => {
      const boolean = confirm("You can not reverse this action");
      if (boolean === true) {
        newVerse.remove();
        savedBiblesArray.splice(i, 1);
        localStorage.setItem("biblesArray", JSON.stringify(savedBiblesArray));
        location.reload();
      } else {
        return;
      }
    };
  }
}

/* ADDING VERSE */

const addVerseBtn = bibleVerses.querySelector("h2 svg");

addVerseBtn.onclick = () => {
  popUpContainer.classList.add("active");
  const versePrompt = popUpContainer.querySelector(".verse-prompt");
  versePrompt.classList.add("active");
  const cancelBtn = document.querySelector(".cancelBtn");
  cancelBtn.onclick = () => {
    popUpContainer.classList.remove("active");
    versePrompt.classList.remove("active");
  };
  versePrompt.onsubmit = () => {
    const newVerse = {
      verse: versePrompt.querySelector("input").value,
      verseDescription: versePrompt.querySelector("textarea").value,
    };
    savedBiblesArray.push(newVerse);
    localStorage.setItem("biblesArray", JSON.stringify(savedBiblesArray));
  };
};

/* VIEWING VERSE */

const viewBtn = bibleVerses.querySelectorAll("article div button");
viewBtn.forEach((btn) => {
  btn.onclick = () => {
    const requiredVerse = savedBiblesArray.find((obj) => {
      return (
        obj.verse ===
        btn.parentElement.parentElement.querySelector("p").textContent
      );
    });
    console.log(requiredVerse);
    popUpContainer.classList.add("active");
    const verseDisplay = popUpContainer.querySelector(".verse-display");
    verseDisplay.classList.add("active");
    verseDisplay.querySelector("h2").textContent = requiredVerse.verse;
    verseDisplay.querySelector("p").textContent =
      requiredVerse.verseDescription;
    verseDisplay.querySelector("button").onclick = () => {
      popUpContainer.classList.remove("active");
      verseDisplay.classList.remove("active");
    };
  };
});

/* HEADER SECTION */

const header = document.querySelector(".header");
const date = header.querySelector(".header-elements h3");

const currentDate = new Date();

const year = currentDate.getFullYear();
const day = currentDate.getDate();
const monthNum = currentDate.getMonth();

const monthArray = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

date.textContent =
  monthArray[monthNum] + ", " + JSON.stringify(day) + ", " + year;

/* GOAL / PHASE SECTION */

const goalEditIcon = header.querySelector(".goal svg");
goalEditIcon.onclick = () => {
  const phase = prompt("Current Phase");
  localStorage.setItem("phase", JSON.stringify(phase));
  location.reload();
};

header.querySelector(".goal q").textContent =
  JSON.parse(localStorage.getItem("phase")) || "Current Phase";
