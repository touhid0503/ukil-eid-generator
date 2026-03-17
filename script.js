document.getElementById("nextBtn").addEventListener("click", function () {
    const fileInput = document.getElementById("imageUpload");
    const designation = document.getElementById("designation").value.trim();

    const file = fileInput.files[0];

    if (!file) {
        alert("Please upload your image.");
        return;
    }

    if (designation === "") {
        alert("Please enter your designation.");
        return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
        // Save to session storage to pass to the next page
        sessionStorage.setItem("userImage", e.target.result);
        sessionStorage.setItem("designation", designation);
        window.location.href = "preview.html";
    };
    reader.readAsDataURL(file);
});