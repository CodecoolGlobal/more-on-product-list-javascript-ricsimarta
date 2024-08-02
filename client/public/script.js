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

const albumDivElement = (content) => {
  return `<div class="album">${content}</div>`;
}

const albumElement = (albumData) => {
  const tracksHtml = tracksElement(albumData.details);

  return albumDivElement(`
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
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().length < 2 ? `0${seconds}` : seconds}`
  /* 

  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}` */
}

const loadEvent = function () {
  console.log(products);

  let albumsGroupedByVendorName = {};

  /* products.forEach(album => 
    albumsGroupedByVendorName[album.vendor.name] ? 
    albumsGroupedByVendorName[album.vendor.name].push(album) : 
    albumsGroupedByVendorName[album.vendor.name] = [album]
  ) */
  // console.log(albumsGroupedByVendorName)

  albumsGroupedByVendorName = products
    .filter(album => album.price >= 1000)
    .sort((a, b) => a.price - b.price)
    .reduce((acc, curr) => {
      acc[curr.vendor.name] ? acc[curr.vendor.name].push(curr) : acc[curr.vendor.name] = [curr]
      return acc
    }, {})

  /* const vendorNames = Object.keys(albumsGroupedByVendorName);
  vendorNames.forEach(vendorName => {
    albumsGroupedByVendorName[vendorName].forEach(album => {
      console.log(vendorName, album)
    })
  }) */

  const rootElement = document.querySelector("#root");

  for (const vendorName in albumsGroupedByVendorName) {
    // console.log(albumsGroupedByVendorName[vendorName])
    const vendorAlbumsHtml = albumsGroupedByVendorName[vendorName]
      .map(album => albumElement(album))
      .join("");

    const vendorHtml = `
      <section>
        <h2>${vendorName}</h2>
        <div class="albums">
          ${vendorAlbumsHtml}
        </div>
      </section>
    `;

    rootElement.insertAdjacentHTML("beforeend", vendorHtml);
  }

  /* const albumsHtml = products
    .filter(album => album.price >= 1000)
    .sort((a, b) => a.price - b.price)
    .map(album => albumElement(album))
    .join("");
  rootElement.insertAdjacentHTML("beforeend", albumsHtml); */
}

window.addEventListener("load", loadEvent);