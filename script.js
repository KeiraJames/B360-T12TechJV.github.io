const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

const background = new Image();
background.src = "images/background.jpg";
background.onload = () => {
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

  const img1 = new Image();
  img1.src = "images/image1.png";
  img1.onload = () => {
    ctx.drawImage(img1, 100, 300, 200, 250);

    const img2 = new Image();
    img2.src = "images/image2.png";
    img2.onload = () => {
      ctx.drawImage(img2, 500, 250, 150, 150);

      ctx.font = "28px Arial";
      ctx.fillStyle = "white";
      ctx.fillText("Keira - My Canvas Scene", 20, 50);
    };
  };
};

