const express = require("express");
const app = express();
const ReactDOMServer = require("react-dom/server");
const Page = require("./pages/page");
const React = require("react");


app.get("/pages/page.js", (req, res) => {
  res.sendFile(__dirname + "/pages/page.js");
});

app.get("/page", async (req, res) => {
  const props = await Page.getProps();
  const html =
    '<div id="root">' +
    ReactDOMServer.renderToString(React.createElement(Page, props)) +
    "</div>";

  res.write(html);
  res.write(
    `<script src="https://unpkg.com/react@17.0.2/umd/react.production.min.js"></script>`
  );
  res.write(
    `<script src="https://unpkg.com/react-dom@17.0.2/umd/react-dom.production.min.js"></script>`
  );

  res.write(`<script src="/pages/page.js"></script>`);

  // hydrate
  res.write(`
  <script>
    const props = ${JSON.stringify(props)};
    ReactDOM.hydrate(React.createElement(Page, props),
      document.getElementById('root')
    )
  </script>
  `);

  res.end();
});

app.listen(8080, function () {
  console.log("server running on 8080");
});