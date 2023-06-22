let convert = document.querySelector(".convert");
let hex = document.querySelector(".hex");
// let hexBox = document.querySelector(".hexColor").style.background;

convert.addEventListener("click", function rgbNumber() {
  let R = Number(document.querySelector(".colorR").value);
  let G = Number(document.querySelector(".colorG").value);
  let B = Number(document.querySelector(".colorB").value);

  if (
    R > 255 ||
    R < 0 ||
    G > 255 ||
    G < 0 ||
    B > 255 ||
    B < 0 ||
    R * G * B == 0
  ) {
    alert("請輸入0~255的正整數");
  } else {
    function sixtDigi(tenDigi) {
      let x = tenDigi.toString(16);
      if (x.length === 1) {
        return "0" + x;
      } else if (x.length === 2) {
        return x;
      }
    }

    hex.value = "#" + sixtDigi(R) + sixtDigi(G) + sixtDigi(B);

    document.querySelector("#hexC").style.background = hex.value;
  }
});
