const wrapper = document.querySelector(".wrapper"),
  searchInput = wrapper.querySelector("input"),
  volume = wrapper.querySelector(".word i"),
  infoText = wrapper.querySelector(".info-text"),
  synonyms = wrapper.querySelector(".synonyms .list"),
  removeIcon = wrapper.querySelector(".search span"),
  form = wrapper.querySelector("form"),
  content = wrapper.querySelector(".content"),
  audio = wrapper.querySelector(".audio");

function data(result, word) {
  wrapper.classList.add("active");
  document.querySelector(".word p").innerHTML = result[0].hwi.hw;
  document.querySelector(".word span").innerText = result[0].hwi.prs[0].mw;
  audio.src = `https://media.merriam-webster.com/audio/prons/en/us/mp3/${word[0]}/${result[0].hwi.prs[0].sound.audio}.mp3`;

  let nouns = result.filter((e) => {
    return e.fl == "noun";
  });
  let verbs = result.filter((e) => {
    return e.fl == "verb";
  });

  for (let i = 0; i < nouns.length; i++) {
    let newLi = document.createElement("li");
    newLi.classList.add("noun");
    newLi.innerHTML = `<div class="details"><p>Noun ${i + 1}</p><span>${
      nouns[i].shortdef
    }</span></div>`;
    content.append(newLi);
  }

  for (let i = 0; i < verbs.length; i++) {
    let newLi = document.createElement("li");
    newLi.classList.add("verb");
    newLi.innerHTML = `<div class="details"><p>Verb ${i + 1}</p><span>${
      verbs[i].shortdef
    }</span></div>`;
    content.append(newLi);
  }
}

const getData = async (word) => {
  wrapper.classList.remove("active");
  infoText.style.color = "#000";
  infoText.innerHTML = `Searching the meaning of <span>"${word}"</span>`;
  let url = `https://dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=1a5753f0-337b-44ba-b567-5b3b71f37079`;

  try {
    let response = await axios.get(url);
    let result = await response.data;
    console.log(result[0].hwi.prs[0].mw);
    data(result, word);
    console.log(result);
  } catch (e) {
    infoText.innerHTML = `Can't find the meaning of <span>"${word}"</span>. Please, try to search for another word.`;
  }
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let word = searchInput.value;
  content.innerHTML = "";
  getData(word);
});

volume.addEventListener("click", () => {
  volume.style.color = "#4D59FB";
  audio.play();
  setTimeout(() => {
    volume.style.color = "#999";
  }, 800);
});

removeIcon.addEventListener("click", () => {
  searchInput.value = "";
  searchInput.focus();
  wrapper.classList.remove("active");
  infoText.style.color = "#9A9A9A";
  infoText.innerHTML =
    "Type any existing word and press enter to get meaning, example, synonyms, etc.";
});
