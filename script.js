document.getElementById("uploadButton").addEventListener("click", () => {
  const fileInput = document.getElementById("fileInput");
  if (fileInput.files.length === 0) {
    alert("Bitte wählen Sie eine Datei aus!");
    return;
  }

  const file = fileInput.files[0];
  const progress = document.getElementById("uploadProgress");
  const status = document.getElementById("uploadStatus");

  // Simulierter Upload-Prozess
  let uploadProgress = 0;
  const interval = setInterval(() => {
    if (uploadProgress >= 100) {
      clearInterval(interval);
      status.textContent = "Upload abgeschlossen!";
    } else {
      uploadProgress += 10;
      progress.value = uploadProgress;
      status.textContent = `Uploading... ${uploadProgress}%`;
    }
  }, 500);
});
