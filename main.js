const maxWidth = 400;
const maxHeight = 400;

const onchange = e => {
  if (input.files && input.files.length == 0) {
    alert("ファイルを選択してください");
    return;
  }
  const file = input.files[0];
  if (!file.type.match("image.*")) {
    alert("画像を選択してください");
    return;
  }
  const reader = new FileReader();
  reader.onload = () => {
    imgsrc = reader.result;
    canvasDraw(imgsrc);
  };
  reader.readAsDataURL(file);
};

const canvasDraw = imgsrc => {
  const image = new Image();
  image.onload = () => {
    let width, height;
    if (image.width > maxWidth || image.height > maxHeight) {
      if (image.width > image.height) {
        width = maxWidth;
        height = (maxWidth * image.height) / image.width;
      } else {
        height = maxHeight;
        width = (maxHeight * image.width) / image.height;
      }
    } else {
      width = image.width;
      height = image.height;
    }

    const canvas = document.createElement("canvas");
    canvas.id = "oejs";
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, maxWidth, maxHeight);
    ctx.drawImage(image, 0, 0, width, height);

    const oldCanvas = document.querySelector("#oejs");
    if (oldCanvas) oldCanvas.remove();
    document.querySelectorAll("#ftbl")[0].appendChild(canvas);

    /* access grobally */
    tegakiJs.oeUpdate = () => {
      var dataUri = canvas.toDataURL("image/png");
      dataUri = dataUri.replace(/^.*,/, "");
      var b = document.getElementById("baseform");
      if (b) {
        b.value = dataUri;
      }
      return true;
    };
  };
  image.src = imgsrc;
};

const input = document.createElement("input");
input.type = "file";
input.addEventListener("change", onchange);
input.click();
