const express = require("express");
const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());

clients = [];

app.get("/clients/", (request, response) => {
  response.json(clients);
  return;
});

app.post("/clients/", (request, response) => {
  const { client, company } = request.body;

  const costume = {
    id: uuid(),
    client,
    company,
  };

  clients.push(costume);
  return response.json(costume);
});

app.put("/clients/:id", (request, response) => {
  const { id } = request.params;
  const { client, company } = request.body;

  const clientsFindIndex = clients.findIndex((param) => param.id === id);

  if (clientsFindIndex < 0) {
    return response.json({ erro: "ErrEmpty" });
  }

  const costume = {
    id,
    client,
    company,
  };

  clients[clientsFindIndex] = costume;
  // console.log(clients);

  return response.json(costume);
});

app.delete("/clients/:id", (request, response) => {
  const { id } = request.params;
  const idIndexParam = clients.findIndex((param) => param.id === id);
  console.log(idIndexParam);

  if (idIndexParam < 0) return response.send("erro delete");

  clients.splice(idIndexParam, 1);
  return response.status(204).send();
});

app.listen(3333, () => {
  console.log("🚀 Server started");
});
