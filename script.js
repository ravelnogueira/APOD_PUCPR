const API_KEY = "sJT9kQAoA7iHfUiWP5Vf0tFUJ3Um3lmYSeUrkudI";
const APOD_ENDPOINT = "https://api.nasa.gov/planetary/apod";

const dateInput = document.getElementById("dateInput");
const searchButton = document.getElementById("searchButton");
const statusMessage = document.getElementById("statusMessage");
const resultSection = document.getElementById("resultSection");
const mediaContainer = document.getElementById("mediaContainer");
const apodTitle = document.getElementById("apodTitle");
const apodDate = document.getElementById("apodDate");
const apodDescription = document.getElementById("apodDescription");
const apodCopyright = document.getElementById("apodCopyright");
const videoTag = document.getElementById("videoTag");

function getTodayIso() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatDate(date) {
  const parsed = new Date(`${date}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) {
    return date;
  }
  return parsed.toLocaleDateString("pt-BR", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}

function setStatus(message, type) {
  statusMessage.textContent = message;
  statusMessage.className = `status status-${type}`;
}

function clearResult() {
  mediaContainer.innerHTML = '<div class="media-placeholder">Aguardando conteudo</div>';
  apodTitle.textContent = "Titulo da publicacao";
  apodDate.textContent = "";
  apodDescription.textContent = "";
  apodCopyright.textContent = "";
  videoTag.classList.add("hidden");
}

function renderLoading() {
  setStatus("Carregando APOD...", "loading");
}

function renderError(message) {
  setStatus(message, "error");
}

function renderFallback() {
  mediaContainer.innerHTML = '<div class="media-placeholder">Conteudo indisponivel para esta data.</div>';
  apodTitle.textContent = "Sem dados validos";
  apodDate.textContent = "";
  apodDescription.textContent =
    "A resposta da API nao trouxe os campos esperados. Tente outra data.";
  apodCopyright.textContent = "";
  videoTag.classList.add("hidden");
}

function renderApod(data) {
  if (!data || !data.title || !data.date || !data.explanation || !data.media_type) {
    renderFallback();
    setStatus("Resposta recebida, mas com formato inesperado.", "error");
    return;
  }

  const isImage = data.media_type === "image";
  const isVideo = data.media_type === "video";
  const mediaUrl = isImage ? data.hdurl || data.url : data.url;

  if (!mediaUrl) {
    renderFallback();
    setStatus("Nao foi possivel encontrar a midia deste dia.", "error");
    return;
  }

  if (isImage) {
    mediaContainer.innerHTML = `<img src="${mediaUrl}" alt="${data.title}" loading="lazy" />`;
    videoTag.classList.add("hidden");
  } else if (isVideo) {
    mediaContainer.innerHTML = `
      <iframe
        src="${mediaUrl}"
        title="${data.title}"
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      ></iframe>
    `;
    videoTag.classList.remove("hidden");
  } else {
    renderFallback();
    setStatus("Tipo de midia nao suportado para exibicao.", "error");
    return;
  }

  apodTitle.textContent = data.title;
  apodDate.textContent = `Data: ${formatDate(data.date)}`;
  apodDescription.textContent = data.explanation;
  apodCopyright.textContent = data.copyright
    ? `Copyright: ${data.copyright}`
    : "Copyright: dominio publico / nao informado";

  setStatus("APOD carregado com sucesso.", "success");
}

function setLoadingState(isLoading) {
  searchButton.disabled = isLoading;
}

function setMaxDateToday() {
  const today = getTodayIso();
  dateInput.max = today;
}

function isFutureDate(date) {
  return date > getTodayIso();
}

async function fetchApodByDate(date) {
  const params = new URLSearchParams({
    api_key: API_KEY,
    date
  });
  const requestUrl = `${APOD_ENDPOINT}?${params.toString()}`;
  const response = await fetch(requestUrl);

  if (!response.ok) {
    throw new Error(`Falha HTTP (${response.status})`);
  }

  return response.json();
}

async function loadApodByDate(date) {
  if (!date) {
    renderError("Escolha uma data antes de buscar.");
    clearResult();
    return;
  }

  if (isFutureDate(date)) {
    renderError("Nao e permitido selecionar data futura.");
    clearResult();
    return;
  }

  renderLoading();
  setLoadingState(true);

  try {
    const apodData = await fetchApodByDate(date);
    renderApod(apodData);
  } catch (error) {
    renderError(`Nao foi possivel carregar o APOD. ${error.message}`);
    clearResult();
  } finally {
    setLoadingState(false);
  }
}

function loadTodayApod() {
  const today = getTodayIso();
  dateInput.value = today;
  loadApodByDate(today);
}

function handleSearch() {
  loadApodByDate(dateInput.value);
}

function init() {
  clearResult();
  setMaxDateToday();
  searchButton.addEventListener("click", handleSearch);
  dateInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  });
  loadTodayApod();
}

init();
