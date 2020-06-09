const express = require("express");
const app = express();
const handlebars = require("express-handlebars");
const projects = require("./data.json");

app.engine("handlebars", handlebars());
app.set("view engine", "handlebars");

app.use(express.static("./projects"));
app.use(express.static("./public"));

app.get("/", (req, res) => {
    res.render("welcome", {
        layout: "main",
        projects,
    });
});

app.get("/:project/description", (req, res) => {
    const project = req.params.project;

    const selectedProject = projects.find((item) => item.directory == project);

    if (!selectedProject) {
        return res.sendStatus(404);
    }

    res.render("description", {
        layout: "main",
        selectedProject: selectedProject,
        projects,
    });
});

app.listen(8080, () => console.log("exp-handle-portfolio server running"));
