let nameuser = document.getElementById("li-username");
let textArea = document.getElementById("li-textarea");
let userimg = document.getElementById("li-image");
let btn = document.getElementById("btnSubmit");

btn.addEventListener("click", () => {
  fetch("https://68219a92259dad2655afc3d3.mockapi.io/Post", {
    method: "POST",
    body: JSON.stringify({
      username: nameuser.value,
      textarea: textArea.value,
      img: userimg.value,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
});

async function fetchAndDisplayProducts() {
  try {
    const response = await fetch(
      "https://68219a92259dad2655afc3d3.mockapi.io/Post"
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    // 3. Parse JSON
    const userData = await response.json();

    // 4. Get the container

    userData.forEach((data) => {
      const userInfo = document.getElementById("userInfo");
      const card = document.createElement("div");
      card.classList.add("user-card");

      // Title
      const userName = document.createElement("h4");
      userName.innerText = data.username;
      userName.classList.add("name");
      card.appendChild(userName);

      // Price
      const textarea = document.createElement("p");
      textarea.innerText = data.textarea;
      textarea.classList.add("text");
      card.appendChild(textarea);

      let img = document.createElement("img");
      img.src = data.img;
      img.alt = data.img;
      card.appendChild(img);

      const deleteBtn = document.createElement("button");
      deleteBtn.innerText = "delete";
      deleteBtn.classList.add("btn-main");
      card.appendChild(deleteBtn);

      deleteBtn.addEventListener("click", () => {
        fetch(`https://68219a92259dad2655afc3d3.mockapi.io/Post/${data.id}`, {
          method: "DELETE",
        });
        card.remove();
      });

      userInfo.appendChild(card);
    });
  } catch (err) {
    console.error("Failed to fetch products:", err);
  }
}
document.addEventListener("DOMContentLoaded", fetchAndDisplayProducts);
