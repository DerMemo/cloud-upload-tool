document.getElementById("uploadButton").addEventListener("click", async () => {
  const fileInput = document.getElementById("fileInput");
  const file = fileInput.files[0];

  if (!file) {
    alert("Bitte wähle eine Datei aus!");
    return;
  }

  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch("http://localhost:3001/upload", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    if (response.ok) {
      const uploadedFilesDiv = document.getElementById("uploadedFiles");
      const link = document.createElement("a");
      link.href = data.fileUrl;
      link.textContent = `${data.fileName}`;
      link.target = "_blank";
      uploadedFilesDiv.appendChild(link);

      const br = document.createElement("br");
      uploadedFilesDiv.appendChild(br);
    } else {
      alert(`Fehler: ${data.message}`);
    }
  } catch (error) {
    console.error("Fehler beim Hochladen:", error);
    alert("Fehler beim Hochladen der Datei.");
  }
});
