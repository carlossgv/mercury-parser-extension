const baseUrl = "https://mercury-parser.carlosgv.dev";
// const baseUrl = "http://localhost:3000";

chrome.action.onClicked.addListener((tab) => {
  if (tab.url) {
    console.log("Tab URL:", tab.url);
    const parserUrl = `${baseUrl}/parser?url=${encodeURIComponent(tab.url)}`;
    console.log("Parser URL:", parserUrl);

    fetch(parserUrl)
      .then((response) => response.json()) // Parse the response as JSON
.then((data) => {
  // Parse the responseText to JSON
  // const data = JSON.parse(responseText);

  // Escape double quotes in the content to avoid parsing issues
  const escapedContent = data.content.replace(/"/g, '&quot;');

  const styledHtml = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${data.title}</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #121212;
          color: #e0e0e0;
          padding: 20px;
          display: flex;
          justify-content: center;
        }
        .container {
          max-width: 800px;
          width: 100%;
          margin: auto;
          background-color: #1e1e1e;
          padding: 30px;
          border-radius: 8px;
          box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.5);
        }
        h1, h2, h3 { color: #ffffff; }
        p { margin-bottom: 1em; }
        img { max-width: 100%; height: auto; display: block; margin: 20px 0; }
        pre { background-color: #333; padding: 10px; overflow: auto; color: #e0e0e0; }
        blockquote { border-left: 4px solid #555; padding-left: 10px; color: #bbb; }
        a {
          color: #82aaff; /* Light blue color for better visibility */
          text-decoration: none;
        }
        a:hover {
          text-decoration: underline;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>${data.title}</h1>
        <img src="${data.lead_image_url}" alt="Lead Image">
        <div>${escapedContent}</div>
        <p><strong>Author:</strong> ${data.author}</p>
        <p><strong>Published on:</strong> ${new Date(data.date_published).toLocaleDateString()}</p>
      </div>
      <script>
        document.querySelectorAll('a').forEach(link => {
          link.addEventListener('click', (event) => {
            event.preventDefault();
            window.open(event.target.href, '_blank');
          });
        });
      </script>
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
