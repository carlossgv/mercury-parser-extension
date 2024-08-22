// chrome.action.onClicked.addListener((tab) => {
//   if (tab.url) {
const tab = { url : "https://www.polygon.com/guides/440631/black-myth-wukong-silk-how-to-get-where-to-find"}
const parserUrl = `https://mercury-parser.carlosgv.dev/parser?url=${encodeURIComponent(tab.url)}`;

fetch(parserUrl)
  .then((response) => response.text())
  .then((parsedHtml) => {
    const blob = new Blob([parsedHtml], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    // chrome.tabs.create({ url });
   console.log(parsedHtml)
  })
  .catch((error) => console.error("Error fetching or parsing:", error));
//   }
// });
