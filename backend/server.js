const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");

const app = express();
const port = 3001;

// CORS aktivieren
app.use(cors());

// Statische Dateien aus dem Ordner "uploads" bereitstellen
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Multer konfigurieren
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Speicherort für Dateien
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Dateiname bleibt gleich
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
});

// API für Datei-Upload
app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("Keine Datei hochgeladen.");
  }

  // Rückgabe der Dateipfad-URL
  res.send({
    message: "Datei erfolgreich hochgeladen.",
    fileName: req.file.originalname,
    filePath: `http://localhost:${port}/uploads/${req.file.filename}`,
  });
});

// Server starten
app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});
