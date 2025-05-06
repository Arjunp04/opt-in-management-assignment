function setupKeywordInput(inputId, containerId, defaultKeywords = []) {
  const input = document.getElementById(inputId);
  const container = document.getElementById(containerId);
  let keywordCount = defaultKeywords.length + 1;

  function renderKeyword(text) {
    const keywordDiv = document.createElement("div");
    keywordDiv.className = "keyword";
    keywordDiv.innerHTML = `
      ${text}
      <span><img src="./assets/Icon.png" alt="remove" /></span>
    `;

    keywordDiv.querySelector("span img").addEventListener("click", () => {
      keywordDiv.remove();
    });

    container.appendChild(keywordDiv);
  }

  // Add default keywords
  defaultKeywords.forEach(renderKeyword);

  // Handle enter key
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const value = input.value.trim() || `Keyword${keywordCount++}`;
      renderKeyword(value);
      input.value = "";
    }
  });

  // Handle plus icon click
  input.nextElementSibling.addEventListener("click", () => {
    const value = input.value.trim() || `Keyword${keywordCount++}`;
    renderKeyword(value);
    input.value = "";
  });
}

// Setup both sections
setupKeywordInput("optinKeywordInput", "optinKeywordContainer", [
  "Join",
    "Subscribe",
  "Welcome"
]);

setupKeywordInput("optoutKeywordInput", "optoutKeywordContainer", [
  "Stop",
    "Unsubscribe",
    "Good-bye",
  "Sorry for inconvenience"
]);
