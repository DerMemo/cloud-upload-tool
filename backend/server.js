require("dotenv").config();
const express = require("express");
const multer = require("multer");
const cors = require("cors");
const { BlobServiceClient } = require("@azure/storage-blob");

const app = express();
const port = 3001;

app.use(cors());

const AZURE_STORAGE_CONNECTION_STRING =
  process.env.AZURE_STORAGE_CONNECTION_STRING;
const blobServiceClient = BlobServiceClient.fromConnectionString(
  AZURE_STORAGE_CONNECTION_STRING
);
const containerName = "uploads";

const upload = multer({ dest: "uploads/" });

app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blobName = req.file.originalname;
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    await blockBlobClient.uploadFile(req.file.path);
    res.send({
      message: "Datei erfolgreich hochgeladen.",
      fileName: blobName,
      fileUrl: `https://${blobServiceClient.accountName}.blob.core.windows.net/${containerName}/${blobName}`,
    });
  } catch (error) {
    res.status(500).send("Fehler beim Hochladen.");
  }
});

app.listen(port, () =>
  console.log(`Server läuft auf http://localhost:${port}`)
);
