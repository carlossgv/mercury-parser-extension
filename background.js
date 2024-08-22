// const baseUrl = "https://mercury-parser.carlosgv.dev";
const baseUrl = "http://localhost:3000";

chrome.action.onClicked.addListener((tab) => {
  if (tab.url) {
    console.log("Tab URL:", tab.url);
    const parserUrl = `${baseUrl}/parser?url=${encodeURIComponent(tab.url)}`;
    console.log("Parser URL:", parserUrl);

    fetch(parserUrl)
      .then((response) => response.text())
      .then((parsedHtml) => {
  const styledHtml = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Parsed Content</title>
      <style>
        body { font-family: Arial, sans-serif; padding: 20px; line-height: 1.6; }
        h1, h2, h3 { color: #333; }
        p { margin-bottom: 1em; }
        img { max-width: 100%; height: auto; }
        pre { background-color: #f4f4f4; padding: 10px; overflow: auto; }
        blockquote { border-left: 4px solid #ccc; padding-left: 10px; color: #555; }
      </style>
    </head>
    <body>
      ${parsedHtml}
    </body>
    </html>
  `;
  
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: (styledHtml) => {
      const blob = new Blob([styledHtml], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank');
    },
    args: [styledHtml],
  });
})
      .catch((error) => console.error("Error fetching or parsing:", error));
  }
});
