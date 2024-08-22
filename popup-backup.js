document.getElementById("parseBtn").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tab = tabs[0];
    if (tab.url) {
      console.log("Tab URL:", tab.url);
      const parserUrl = `https://mercury-parser.carlosgv.dev/parser?url=${encodeURIComponent(tab.url)}`;
      console.log("Parser URL:", parserUrl);

      // fetch(parserUrl)
      //   .then((response) => response.text())
      //   .then((parsedHtml) => {
      //     const blob = new Blob([parsedHtml], { type: "text/html" });
      //     const url = URL.createObjectURL(blob);
      //     chrome.tabs.create({ url });
      //   })
      //   .catch((error) => console.error("Error fetching or parsing:", error));
    }
  });
});
