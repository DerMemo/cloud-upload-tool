document.getElementById("uploadButton").addEventListener("click", () => {
  const fileInput = document.getElementById("fileInput");
  const file = fileInput.files[0];

  if (!file) {
    alert("Bitte wähle eine Datei aus!");
    return;
  }

  const formData = new FormData();
  formData.append("file", file);

  fetch("http://localhost:3001/upload", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      alert(data.message);

      const uploadedFiles = document.getElementById("uploadedFiles");
      const listItem = document.createElement("li");
      listItem.textContent = data.fileName;
      uploadedFiles.appendChild(listItem);
    })
    .catch((error) => {
      console.error("Fehler beim Hochladen:", error);
      alert("Fehler beim Hochladen der Datei.");
    });
});
