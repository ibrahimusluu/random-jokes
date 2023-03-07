class Screen {
  constructor() {
    this.getJokeBtn = document.querySelector(".get-joke-button");
    this.getJokeBtn.addEventListener("click", () => this.getJoke()); // or "this.getJoke" or "this.getJoke.bind(this)" as second parameter
  }

  async getJoke() {
    const randomImage = await new UnsplashApi().getImageRandomly(); // we need to "wait" for result on the behalf of our project logic
    const randomJoke = await new JokeApi().getJokeRandomly();
    const translation = await new GoogleTranslateApi(randomJoke).translate();

    const allResults = {
      randomImage,
      randomJoke,
      translation,
    };

    this.printResultsToScreen(allResults);
  }

  printResultsToScreen(results) {
    document.querySelector(".result").innerHTML = `<div class="card">
            <div class="card-image">
              <!-- 16: width, 9: heigth -->
              <figure class="image is-16by9">
                <img
                  src="${results.randomImage}"
                  alt="Placeholder image"
                />
              </figure>
            </div>
            <div class="card-content">
              <div class="media">
                <div class="media-content">
                  <p class="title is-4 has-text-danger pb-4">${results.randomJoke}</p>
                </div>
              </div>
            </div>
            <div class="card-content">
              <div class="media">
                <div class="media-content">
                  <p class="title is-4 has-text-primary pb-4">
                    <span class="has-text-danger">Translated to Turkish: </span>${results.translation}
                  </p>
                </div>
              </div>
            </div>
          </div>`;
  }
}
