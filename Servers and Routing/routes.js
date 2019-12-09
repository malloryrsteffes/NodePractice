const fs = require("fs");

// Request Handler
const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;

  // Conditional render for "/" route
  if (url === "/") {
    res.write("<html><body>");
    res.write(
      "<form action='/create-user' method='POST'><input type='text' name='username'><button type='submit'>Send</button></form>"
    );
    res.write("</body></html>");
    return res.end();
  }

  // Conditional render for "/users" route
  if (url === "/users") {
    res.write("<html><body>");
    res.write("<ul><li>Rachel</li><li>Jake</li><li>Cassie</li></ul>");
    res.write("</body></html>");
    return res.end();
  }

  if (url === "/create-user" && method === "POST") {
    const body = [];
    // Data arrives in chunks
    req.on("data", chunk => {
      //   console.log(chunk);
      body.push(chunk);
    });

    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const username = parsedBody.split("=")[1];
      console.log(username);
      fs.writeFile("message.txt", username, err => {
        res.statusCode = 302;
        res.setHeader("Location", "/users");
        return res.end();
      });
    });
  }

  res.setHeader("Content-Type", "text/html");
  res.write("<html><body>");
  res.write("<h2>Hello from the server</h2>");
  res.write("</body></html>");
  res.end();
};

module.exports = requestHandler;
