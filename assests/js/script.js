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
  deleteBtn.classList.add("btn-delete");
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

btn.addEventListener("click", (event) => {
  event.preventDefault();

  // grab & trim values
  const username = nameuser.value.trim();
  const textareaVal = textArea.value.trim();
  const imgVal = userimg.value.trim();

  // 1) Username length
  if (username.length < 4) {
    alert("Username must be >3 characters");
    return;
  }

  // 2) Textarea length
  if (textareaVal.length < 6) {
    alert("Text must be >5 characters");
    return;
  }

  // 3) Image URL required
  if (!imgVal) {
    alert("Image URL is required");
    return;
  }

  fetch(
    `https://68219a92259dad2655afc3d3.mockapi.io/Post?username=${encodeURIComponent(
      username
    )}`
  )
    .then((res) => res.json())
    .then((matches) => {
      if (matches.length > 0) {
        alert("Username already exists. Please choose another.");
        return;
      }
      return fetch("https://68219a92259dad2655afc3d3.mockapi.io/Post", {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=UTF-8" },
        body: JSON.stringify({ username, textarea: textareaVal, img: imgVal }),
      });
    })
    .then((res) => {
      if (!res) return;
      return res.json();
    })
    .then((newData) => {
      if (!newData) return;
      createCard(newData);
      nameuser.value = "";
      textArea.value = "";
      userimg.value = "";
      nameuser.focus();
    });
});
// initialize
document.addEventListener("DOMContentLoaded", fetchAndDisplayProducts);
