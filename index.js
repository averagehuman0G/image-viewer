const nextBtn = document.querySelector('#next');
const backBtn = document.querySelector('#back');
const selectRedditSub = document.querySelector('#sub');
const img = document.querySelector('#img');
const loading = document.querySelector('#loading');

const LOADING_ERR_URL = 'public/error.png';
const Observable = Rx.Observable;

// get an array of img URLs for a given Reddit sub

function getSubImages(sub) {
  const cachedImages = localStorage.getItem(sub);
  if (cachedImages) {
    return Observable.of(JSON.parse(cachedImages));
  } else {
    const url = `https://www.reddit.com/r/${sub}/.json?limit=200&show=all`;

    return Observable.defer(() => {
      Observable.fromPromise(
        fetch(url)
          .then(res => res.json())
          .then(data => {
            const images = data.data.children.map(image => image.data.url);
            localStorage.setItem(sub, JSON.stringify(images));
            return images;
          })
      );
    });
  }
}

//make the image Observable
const images;
