const maxWidth = 250;
const maxHeight = 250;

const input = document.createElement("input");

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
    const cv = document.getElementById("oejs");
    if (!cv) {
      alert("手書き機能をオンにしてください");
      return;
    }
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
    cv.width = width;
    cv.height = height;
    const ctx = cv.getContext("2d");
    ctx.drawImage(image, 0, 0, width, height);
  };
  image.src = imgsrc;
};

input.setAttribute("type", "file");
input.addEventListener("change", onchange);
document.body.append(input);
