import express, { json } from "express";
import { getAppliances } from "./Products/appliances.js";
import fs from "fs";
const app = express();
app.use(json());

const appliances = getAppliances();
app.get("/products/appliances", (request, response) => {
  response.status(200).json({
    status: "success",
    data: {
      appliances
    }
  })
});

app.get("/products/appliances/:id", (request, response) => {
  const id = request.params.id * 1;
  const appliance = appliances.find((appliance) => appliance.id === id);
  if (appliance) {
    response.status(200).json({
      status: "success",
      data: {
        appliance,
      },
    });
  } else {
    response.status(400).json({
      status: "fail",
      message: "Not found",
    });
  }
});

app.patch("/products/appliances/:id", (request, response) => {
  const id = request.params.id * 1;
  const appliance = appliances.find((appliance) => appliance.id === id);
  if (appliance) {
    // Update appliance
  } else {
    response.status(400).json({
      status: "fail",
      message: "Not found",
    });
  }
});

app.delete("/products/appliances/:id", (request, response) => {
  const id = request.params.id * 1;
  const appliance = appliances.find((appliance) => appliance.id === id);
  if (appliance) {
    // Delete the product appliance...
  } else {
    response.status(400).json({
      status: "fail",
      message: "Not found",
    });
  }
});

app.post("/products/appliances", (req, res) => {
  const newId = appliances[appliances.length - 1].id + 1;
  const newAppliance = Object.assign({ id: newId }, req.body);
  appliances.push(newAppliance);
  const products = Object.assign({ appliances });
  fs.writeFile("./Products/products.json", JSON.stringify(products), (err) => {
    res.status(201).json({
      status: "success",
      data: {
        newAppliance,
      },
    });
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server listening to PORT: ", PORT);
});

