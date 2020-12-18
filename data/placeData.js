import {data} from './data.js';

/**
 * @typedef{{
 *   id: string,
 *   name: string,
 *   address: string,
 *   stars: number,
 *   reviews: number,
 *   price: string,
 *   description: string,
 *   img?: string,
 * }}
 */
export let Place;

data.set('places', []);
data.set('placesLoaded', false);
data.set('placeFilter', '');

/**
 * Loads places and saves to the data store.
 * @return {!Promise<void>}
 */
export async function initializePlaces() {
  const placesWithImages = await loadPlacesWithImages();
  data.set('places', placesWithImages);
  data.set('placesLoaded', true);
  data.onChange(() => console.log(data.get("placeFilter")))
}

/**
 * Loads the place list data and merges with place image data.
 * @return {!Promise<!Array<!Place>>}
 */

function loadPlacesWithImages() {
  // TODO: Load the place list data from https://byteboard.dev/api/data/places
  // and combine with images from https://byteboard.dev/api/data/img/{placeId}
  return fetch('https://byteboard.dev/api/data/places')
    .then(response => response.json())
    .then(data => {
      const promises = data.places.map(place => {
        return fetch(`https://byteboard.dev/api/data/img/${place.id}`)
          .then(response => response.json())
          .then(data => {
            place.img = data.img
            return place
          });
      });
      return Promise.all(promises)
    });
    
  // return [{
  //   id: 'example-a',
  //   name: 'TODO',
  //   address: 'TODO',
  //   stars: 0,
  //   reviews: 0,
  //   price: '$',
  //   description: 'TODO',
  //   img: '',
  // }, {
  //   id: 'example-b',
  //   name: 'TODO',
  //   address: 'TODO',
  //   stars: 0,
  //   reviews: 0,
  //   price: '$',
  //   description: 'TODO',
  //   img: '',
  // }];
}
