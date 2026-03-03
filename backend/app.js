const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const mysql = require("mysql2");
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "haruka",
  database: "db_calendar_l18",
});
connection.connect((error) => {
  if (error) throw error;
  console.log("Successfully connected to MySQL! ");
});

app.get("/events", (req, res) => {
  const selectQuery = "SELECT * FROM events";
  connection.query(selectQuery, (error, result) => {
    if (error) throw error;
    res.json(result);
  });
});

app.post("/events", (req, res) => {
  const { title, startDateTime, endDateTime, category } = req.body;
  const insertQuery = `
    INSERT INTO events (id, title, start_datetime, end_datetime, category) VALUES
    (null, '${title}', '${startDateTime}', '${endDateTime}', '${category}')
  `;
  connection.query(insertQuery, (error) => {
    if (error) throw error;
    res.end();
  });
});

app.put("/events/:id", (req, res) => {
  const requestId = Number(req.params.id);
  const { title, startDateTime, endDateTime, category } = req.body;
  const updateQuery = `
    UPDATE events
    SET    title='${title}',
           start_datetime='${startDateTime}',
           end_datetime='${endDateTime}',
           category='${category}'
    WHERE  id=${requestId}
  `;
  connection.query(updateQuery, (error) => {
    if (error) throw error;
    res.end();
  });
});

app.delete("/events/:id", (req, res) => {
  const requestId = Number(req.params.id);
  const deleteQuery = `
    DELETE
    FROM   events
    WHERE  id=${requestId}
  `;
  connection.query(deleteQuery, (error) => {
    if (error) throw error;
    res.end();
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
