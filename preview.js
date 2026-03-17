const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const template = new Image();
template.src = "assets/template.png";

const userImageData = sessionStorage.getItem("userImage");
const designation = sessionStorage.getItem("designation");

if (!userImageData) {
    alert("Data missing. Please start again.");
    window.location.href = "index.html";
}

const userImg = new Image();
userImg.src = userImageData;

// We use a counter to ensure both images are fully loaded before drawing
let imagesLoaded = 0;
const totalImages = 2;

function checkLoading() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        renderCard();
    }
}

template.onload = checkLoading;
userImg.onload = checkLoading;

function renderCard() {
    // 1. Draw Template (Full size)
    ctx.drawImage(template, 0, 0, 1414, 2000);
    //<br></br>
    /* 
       2. Image Box Coordinates 
       Based on your Canva measurements and template scale 
    */
    const boxX = 805;    // Left position
    const boxY = 575;    // Top position
    const boxW = 465;    // Width
    const boxH = 705;    // Height

    // Draw user image with "Center-Crop" logic to prevent stretching
    drawCroppedImage(ctx, userImg, boxX, boxY, boxW, boxH);

    /* 
       3. Designation Text 
    */
    ctx.fillStyle = "darkgreen"; // A warm color that stands out
    ctx.font = "bold 40px Arial"; // Bold makes it look professional like Canva
    ctx.textAlign = "center";

    // Text: User Input + ", Ukil"
    const fullText = designation + ", Ukil";

    // Positioned below the image box
    ctx.fillText(fullText, 1040, 1365);
}

/**
 * Custom function to draw an image centered and cropped (Object-fit: cover)
 */
function drawCroppedImage(ctx, img, x, y, w, h) {
    const imgRatio = img.width / img.height;
    const boxRatio = w / h;
    let sx, sy, sw, sh;

    if (imgRatio > boxRatio) {
        // Image is wider than the box
        sh = img.height;
        sw = img.height * boxRatio;
        sx = (img.width - sw) / 2;
        sy = 0;
    } else {
        // Image is taller than the box
        sw = img.width;
        sh = img.width / boxRatio;
        sx = 0;
        sy = (img.height - sh) / 2;
    }
    ctx.drawImage(img, sx, sy, sw, sh, x, y, w, h);
}

/* Download Logic */
document.getElementById("downloadBtn").onclick = function () {
    const link = document.createElement("a");
    link.download = "ukil-eid-card.png";
    link.href = canvas.toDataURL("image/png", 1.0);
    link.click();
};