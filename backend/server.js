import express from "express";
const app = express();
const PORT = 5000;

app.use(express.json());

app.get("/api/message", (req, res) => {
  res.json({ message: "Hello from the backend 👋" });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
