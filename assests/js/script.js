const nameuser = document.getElementById("li-username");
const textArea = document.getElementById("li-textarea");
const userimg = document.getElementById("li-image");
const btn = document.getElementById("btnSubmit");
const userInfo = document.getElementById("userInfo");

// 1) Card-creation
function createCard(data) {
  const card = document.createElement("div");
  card.classList.add("user-card");

  const userName = document.createElement("h4");
  userName.innerText = data.username;
  userName.classList.add("name");
  card.appendChild(userName);

  const textarea = document.createElement("p");
  textarea.innerText = data.textarea;
  textarea.classList.add("text");
  card.appendChild(textarea);

  const img = document.createElement("img");
  img.src = data.img;
  img.alt = `Avatar of ${data.username}`;
  card.appendChild(img);

  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "delete";
  deleteBtn.classList.add("btn-main");
  card.appendChild(deleteBtn);

  deleteBtn.addEventListener("click", () => {
    fetch(`https://68219a92259dad2655afc3d3.mockapi.io/Post/${data.id}`, {
      method: "DELETE",
    }).then(() => card.remove());
  });

  userInfo.appendChild(card);
}

// 2) Load existing posts on DOMContentLoaded
function fetchAndDisplayProducts() {
  fetch("https://68219a92259dad2655afc3d3.mockapi.io/Post")
    .then((res) => res.json())
    .then((userData) => {
      userData.forEach(createCard);
    });
}

// 3) Submit handler
btn.addEventListener("click", (event) => {
  event.preventDefault();

  const payload = {
    username: nameuser.value.trim(),
    textarea: textArea.value.trim(),
    img: userimg.value.trim(),
  };

  if (!payload.username || !payload.textarea || !payload.img) {
    alert("Please fill in all fields.");
    return;
  }

  fetch("https://68219a92259dad2655afc3d3.mockapi.io/Post", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=UTF-8" },
    body: JSON.stringify(payload),
  })
    .then((res) => res.json())
    .then((newData) => {
      createCard(newData);
      // Clear the form
      nameuser.value = "";
      textArea.value = "";
      userimg.value = "";
      nameuser.focus();
    });
});

// initialize
document.addEventListener("DOMContentLoaded", fetchAndDisplayProducts);
