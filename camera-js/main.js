(() => {
    if (
      !"mediaDevices" in navigator ||
      !"getUserMedia" in navigator.mediaDevices
    ) {
      alert("Ops!!! Seu navagador não tem suporte para acessar à câmera.");
      return;
    }
  
    const video = document.getElementById("moa-video");
    const screenshotButton = document.getElementById("moa-screenshot-button");
    const screenshotList = document.getElementById("moa-screenshot-list");
    const canvas = document.getElementById("canvas");
  
    let videoStream;
  
    const settings = {
      video: {
        width: { min: 1280, ideal: 1920, max: 1920 },
        height: { min: 720, ideal: 1080, max: 1080 },
      },
    };
  
    screenshotButton.addEventListener("click", () => screenshot());
  
    const screenshot = () => {
      const img = document.createElement("img");
  
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext("2d").drawImage(video, 0, 0);
  
      img.src = canvas.toDataURL("image/png");
      screenshotList.prepend(img);
    };
  
    const initializeCamera = async () => {
      try {
        videoStream = await navigator.mediaDevices.getUserMedia(settings);
        video.srcObject = videoStream;
      } catch (e) {
        alert("Sem acesso à câmera. Por favor, tente novamente!");
      }
    };
  
    initializeCamera();
  })();