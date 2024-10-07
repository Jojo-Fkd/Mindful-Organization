const haikuContainer = document.querySelector(".haiku");

const popupContainer = document.querySelector(".popup-container");
const addHaikuBtn = document.querySelector(".add-haiku-btn");

let dayIncrement = JSON.parse(localStorage.getItem("dayIncrement")) || 0;

const haikuCollection =
  JSON.parse(localStorage.getItem("haikuCollection")) || [];

/* RENDERING HAIKU */

for (let i = 0; i < haikuCollection.length; i++) {
  const haiku = haikuCollection[i];
  const article = document.createElement("article");
  article.innerHTML = `
            <h4>Day ${haiku.day} <button>Journal</button></h4>
            <ul class="haiku-content">
              <li>${haiku.haiku[0]}</li>
              <li>${haiku.haiku[1]}</li>
              <li>${haiku.haiku[2]}</li>
            </ul>
  `;
  article.className = "haiku-card";
  haikuContainer.insertBefore(article, addHaikuBtn);
  // ADDING AND RENDERING JOUNRAL

  article.querySelector("h4 button").onclick = () => {
    popupContainer.classList.add("active");
    if (haiku.journal === "Not yet written") {
      const journalPrompt = popupContainer.querySelector(".journal-prompt");
      journalPrompt.classList.add("active");
      journalPrompt.querySelector("h2").textContent = `Journal / ${haiku.date}`;
      journalPrompt.onsubmit = (event) => {
        event.preventDefault();
        const journalContent =
          journalPrompt.querySelector("section textarea").value;
        haiku.journal = journalContent;
        localStorage.setItem(
          "haikuCollection",
          JSON.stringify(haikuCollection)
        );
        location.reload();
      };
      journalPrompt.querySelector("div button:last-child").onclick = () => {
        location.reload();
      };
    } else {
      const journalDisplay = popupContainer.querySelector(".journal-display");
      journalDisplay.classList.add("active");
      journalDisplay.querySelector(
        "h2"
      ).textContent = `Journal / ${haiku.date}`;
      journalDisplay.querySelector("p").textContent = haiku.journal;
      journalDisplay.querySelector("button").onclick = () => {
        location.reload();
      };
    }
  };
}

/* ADDING HAIKU */

addHaikuBtn.onclick = () => {
  dayIncrement++;
  popupContainer.classList.add("active");
  const haikuPrompt = popupContainer.querySelector(".haiku-prompt");

  haikuPrompt.querySelector("h2").textContent = `Day ${dayIncrement}`;
  haikuPrompt.classList.add("active");
  haikuPrompt.onsubmit = (event) => {
    event.preventDefault();
    const firstLine = haikuPrompt.querySelector(
      "section input:first-child"
    ).value;
    const secondLine = haikuPrompt.querySelector(
      "section input:nth-child(2)"
    ).value;
    const thirdLine = haikuPrompt.querySelector(
      "section input:nth-child(3)"
    ).value;
    const newHaiku = {
      day: dayIncrement,
      haiku: [firstLine, secondLine, thirdLine],
      journal: "Not yet written",
      date: `${monthArray[monthNum]}, ${JSON.stringify(day)}, ${year}`,
    };
    haikuCollection.push(newHaiku);
    localStorage.setItem("haikuCollection", JSON.stringify(haikuCollection));
    localStorage.setItem("dayIncrement", JSON.stringify(dayIncrement));
    location.reload();
  };
  const cancelBtn = haikuPrompt.querySelector("div button:last-child");
  cancelBtn.onclick = () => {
    dayIncrement--;
    localStorage.setItem("dayIncrement", JSON.stringify(dayIncrement));
    location.reload();
  };
};
