import axios from "axios";


export async function getImage(url) {
  const response = await axios.get(url)

  return response.data;
  // return response.data.image;

}

    // Anime API not working rigth now
    //   axios
    //     .get("https://api.jikan.moe/v3/search/character?q=pikachu&rated=pg")
    //     .then(response => {
    //       this.image =
    //         response.data.results[
    //           this.getRandomNumber(response.data.results.length)
    //         ].image_url;

    //       this.$emit("anime", this.image);
    //     });
    // }

