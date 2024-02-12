const text = document.getElementById("text");
const originalText = text.innerText;
const counter = document.createElement("h1");
const nextButton = document.createElement("button");
const prevButton = document.createElement("button");
const selectedHighlight = document.createElement("div");

let currentIndex = 0;
let matches = [];

counter.innerText = "0";
nextButton.innerText = "Next";
prevButton.innerText = "Previous";
document.body.append(counter, prevButton, nextButton, selectedHighlight);

document.getElementById("myinput").addEventListener("input", (e) => {
  const inputTxt = e.target.value;
  matches = [];
  currentIndex = 0;

  if (inputTxt !== "") {
    const regex = new RegExp(inputTxt, "gi");
    text.innerHTML = originalText.replace(regex, (match) => {
      matches.push(match);
      return `<span class="highlight">${match}</span>`;
    });

    counter.innerText = matches.length;
    updateHighlight();
  } else {
    text.innerHTML = originalText;
    counter.innerText = "0";
    selectedHighlight.innerText = ``;
  }
});

function updateHighlight() {
  const highlighted = document.querySelectorAll(".highlight");
  highlighted.forEach((item, index) => {
    if (index === currentIndex) {
      item.style.backgroundColor = "yellow";
    } else {
      item.style.backgroundColor = "yellowgreen";
    }
  });
  selectedHighlight.innerText = `${
    matches.length > 0 ? currentIndex + 1 : ""
  }/${matches.length}`;
}

nextButton.addEventListener("click", () => {
  if (matches.length > 0) {
    currentIndex = (currentIndex + 1) % matches.length;
    updateHighlight();
  }
});

prevButton.addEventListener("click", () => {
  if (matches.length > 0) {
    currentIndex = (currentIndex - 1 + matches.length) % matches.length;
    updateHighlight();
  }
});
