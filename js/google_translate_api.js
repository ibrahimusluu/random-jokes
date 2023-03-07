class GoogleTranslateApi {
  constructor(englishJoke) {
    this.baseURL = "https://translation.googleapis.com/";
    this.sentenceForSearch = englishJoke;
    this.axiosObject = axios.create({
      /* Tested Query Parameter of EndPoint on Postman below:
        ?target=tr&key=MY_GOOGLE_TRANSLATE_API_KEY&q=how is all going */
      baseURL: this.baseURL,
      params: {
        target: "tr",
        key: `${MY_GOOGLE_TRANSLATE_API_KEY}`, // key should be written in "Environments"

        q: this.sentenceForSearch,
      },
    });
  }

  async translate() {
    console.log(MY_GOOGLE_TRANSLATE_API_KEY); // Test of Local Env JS File
    try {
      const translation = await this.axiosObject.get("language/translate/v2");
      console.log(translation.data.data.translations[0].translatedText);
      return translation.data.data.translations[0].translatedText;
    } catch (error) {
      console.log(error.response.data.error.message);
      return `An Error Occured: ${error.response.data.error.message}`;
    }
  }
}
