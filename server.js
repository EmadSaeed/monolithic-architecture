import dbConfig from "./config/db.js";
import express from "express";
import bodyParser from "body-parser";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import basketRoutes from "./routes/basketRouts.js";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express"

dbConfig();
const app = express();
const port = process.env.PORT || 8000;

app.use(bodyParser.json());

// simple route
app.get("/", (req, res) => {
    res.send('Welcome to the monolithic-architecture server');
});

// Product routes
app.use("/api/products", productRoutes);

// Order routes
app.use("/api/orders", orderRoutes);

// Basket routes
app.use("/api/baskets", basketRoutes);


// Swagger options & specs
const options = {
    definition: {
        openapi: "3.1.0",
        info: {
            title: "Monolithic Architecture API",
            version: "0.1.0",
            description:
                "This is an E-commerce CRUD API for a Monolithic Architecture",
            license: {
                name: "MIT",
                url: "https://spdx.org/licenses/MIT.html",
            },
        },
        servers: [
            {
                url: "http://localhost:8000",
            },
        ],
    },
    apis: ["./routes/*.js"],
};

const specs = swaggerJsdoc(options);
app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs, { explorer: true })
);

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});
