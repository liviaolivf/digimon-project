document.addEventListener("DOMContentLoaded", function () {
  const digimonList = document.getElementById("digimon-list");
  const searchBar = document.getElementById("search-bar");
  const levelFilter = document.getElementById("level-filter");
  const modal = document.getElementById("modal");
  const modalContent = document.getElementById("modal-details");
  const closeModal = document.getElementsByClassName("close")[0];

  let digimons = [];

  fetch("https://digimon-api.vercel.app/api/digimon")
    .then((response) => response.json())
    .then((data) => {
      digimons = data;
      displayDigimons(digimons);
    })
    .catch((error) => {
      console.error("Erro ao buscar os dados:", error);
    });

  searchBar.addEventListener("input", function () {
    const searchQuery = searchBar.value.toLowerCase();
    const filteredDigimons = digimons.filter((digimon) =>
      digimon.name.toLowerCase().includes(searchQuery)
    );
    displayDigimons(filteredDigimons);
  });

  levelFilter.addEventListener("change", function () {
    const selectedLevel = levelFilter.value;
    const filteredDigimons =
      selectedLevel === "all"
        ? digimons
        : digimons.filter((digimon) => digimon.level === selectedLevel);
    displayDigimons(filteredDigimons);
  });

  closeModal.addEventListener("click", function () {
    modal.style.display = "none";
  });

  window.addEventListener("click", function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  });

  function displayDigimons(digimons) {
    digimonList.innerHTML = "";
    digimons.forEach((digimon) => {
      const digimonCard = document.createElement("div");
      digimonCard.className = "digimon-card";

      const digimonImg = document.createElement("img");
      digimonImg.src = digimon.img;
      digimonImg.alt = digimon.name;

      const digimonName = document.createElement("h2");
      digimonName.textContent = digimon.name;

      const detailsButton = document.createElement("button");
      detailsButton.textContent = "Mais Detalhes";
      detailsButton.addEventListener("click", function () {
        showDetails(digimon);
      });

      digimonCard.appendChild(digimonName);
      digimonCard.appendChild(digimonImg);
      digimonCard.appendChild(detailsButton);
      digimonList.appendChild(digimonCard);
    });
  }

  function showDetails(digimon) {
    modalContent.innerHTML = `
        <h2>${digimon.name}</h2>
        <img src="${digimon.img}" alt="${digimon.name}" style="max-width: 100%; border-radius: 8px;">
        <p class="modal-level"><strong>Nível:</strong> ${digimon.level}</p>
        <p class="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vestibulum ex a nunc ultrices interdum. Suspendisse a varius dolor, vitae consectetur quam. Donec vestibulum elit eu scelerisque lobortis. Proin sodales efficitur tortor. Nullam vitae metus at dolor porttitor faucibus eget a sem. Praesent porta viverra risus, at pulvinar magna tristique sed.</p>
    `;
    modal.style.display = "block";
  }
});
