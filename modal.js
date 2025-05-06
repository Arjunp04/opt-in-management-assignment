function openModal() {
  document.getElementById("openModal").style.display = "block";
}

function closeModal() {
  document.getElementById("openModal").style.display = "none";
}

const textarea = document.getElementById("messageBox");
const charCount = document.getElementById("charCount");

textarea.addEventListener("input", () => {
  charCount.textContent = `${textarea.value.length}/4096`;
});

document.addEventListener("DOMContentLoaded", function () {
  const mediaFields = document.getElementById("mediaFields");
  const mediaPreview = document.getElementById("mediaPreview");
  const previewImage = document.getElementById("previewImage");
  const filePreview = document.getElementById("filePreview");
  const msgFormatRadios = document.getElementsByName("msg-format");
  const messageTypeRadios = document.getElementsByName("message-type");

  const templateDropdown = document.getElementById("templateDropdown");
  const valuesDiv = document.getElementById("valuesDiv");

  const typeGroup = document.querySelector(".type-group");
  const messageLabel = document.querySelector(".message-label");
  const textareaWrapper = document.querySelector(".textarea-wrapper");

  // Handle changes
  msgFormatRadios.forEach((radio) => {
    radio.addEventListener("change", updateUI);
  });

  messageTypeRadios.forEach((radio) => {
    radio.addEventListener("change", updateUI);
  });

 function updateUI() {
   const selectedFormat = Array.from(msgFormatRadios).find(
     (r) => r.checked
   )?.value;

   const selectedTypeRadio = Array.from(messageTypeRadios).find(
     (r) => r.checked
   );
   const selectedType = selectedTypeRadio?.value;

   const isPreApprovedTemplate =
     selectedTypeRadio?.name === "message-type" && selectedType === "template";

   const showMedia =
     isPreApprovedTemplate ||
     selectedFormat === "image" ||
     selectedFormat === "video" ||
     selectedFormat === "document";

   // Show/hide media fields
   if (showMedia) {
     mediaFields.style.display = "block";
     mediaPreview.style.display = "block";

     if (selectedFormat === "document") {
       previewImage.style.display = "none";
       filePreview.style.display = "flex";
     } else if (
       selectedFormat === "image" ||
       selectedFormat === "video" ||
       isPreApprovedTemplate
     ) {
       previewImage.src = "./assets/image1.png";
       previewImage.style.display = "block";
       filePreview.style.display = "none";
     } else {
       previewImage.style.display = "none";
       filePreview.style.display = "none";
     }
   } else {
     mediaFields.style.display = "none";
     mediaPreview.style.display = "none";
     previewImage.src = "";
     previewImage.style.display = "none";
     filePreview.style.display = "none";
   }

   // Show/hide text inputs and template-specific elements
   if (isPreApprovedTemplate) {
     typeGroup.style.display = "none";
     messageLabel.style.display = "none";
     textareaWrapper.style.display = "none";

     templateDropdown.style.display = "block";
     valuesDiv.style.display = "block";
   } else {
     typeGroup.style.display = "block";
     messageLabel.style.display = "flex";
     textareaWrapper.style.display = "block";

     templateDropdown.style.display = "none";
     valuesDiv.style.display = "none";
   }
 }


  updateUI(); // Initialize on load
});
