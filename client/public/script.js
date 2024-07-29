import { products } from '/data.js';


const divElement = (content) => {
  return `<div>${content}</div>`;
}

const trackElement = (trackData) => {
  return divElement(`
    <p>track name: ${trackData.name}</p>
    <p>composer: ${trackData.composer}</p>
    <p>length: ${convertMsToTime(trackData.milliseconds)}</p>
  `)
}

const tracksElement = (tracksArray) => { 
  return tracksArray.map(track => trackElement(track)).join("");
}


const albumElement = (albumData) => {
  const tracksHtml = tracksElement(albumData.details);

  return divElement(`
      <h2>${albumData.id}</h2>
      <h3>price: ${albumData.price}</h3>
      <p class="album-name">album name: ${albumData.name}</p>
      ${divElement(tracksHtml)}
    `);
}

const convertMsToTime = (ms) => {
  let seconds = Math.round(ms / 1000);
  let minutes = Math.floor(seconds / 60);
  seconds -= minutes * 60;
  let hours = Math.floor(minutes / 60);
  minutes -= hours * 60;

  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
}

const loadEvent = function () {
  console.log(products[0]);

  const rootElement = document.querySelector("#root");
  const albumsHtml = products
    .filter(album => album.price >= 1000)
    .sort((a, b) => a.price - b.price)
    .map(album => albumElement(album))
    .join("");
  rootElement.insertAdjacentHTML("beforeend", albumsHtml);
}

window.addEventListener("load", loadEvent);