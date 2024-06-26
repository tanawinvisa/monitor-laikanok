async function fetchGoldPrice() {
  try {
    const response = await fetch("https://api.chnwt.dev/thai-gold-api/latest");
    const data = await response.json();

    if (data.status === "success") {
      const priceData = data.response.price;

      document.getElementById("date").innerText = data.response.date;
      document.getElementById("update_time").innerText =
        data.response.update_time;

      document.getElementById("gold_bar_buy").innerText =
        priceData.gold_bar.buy;
      document.getElementById("gold_bar_sell").innerText =
        priceData.gold_bar.sell;
      document.getElementById("change_previous").innerText =
        priceData.change.compare_previous;
      document.getElementById("change_yesterday").innerText =
        priceData.change.compare_yesterday;
    } else {
      console.error("Failed to fetch gold prices");
    }
  } catch (error) {
    console.error("Error fetching gold price:", error);
  }
}

// Predefined list of images

let cntImg = 0;
// Assuming image files are named sequentially as img1.jpg, img2.jpg, etc.
const numberOfImages = 52; // Update this to the total number of images you have

function showRandomImage() {
  if (cntImg === numberOfImages) cntImg = 0;
  cntImg += 1;

  const srcImage = `./img/img${cntImg}.jpg`;

  const imgElement = document.getElementById("random-image");
  imgElement.src = srcImage;
}

// Initial fetch and setup
fetchGoldPrice();
showRandomImage();

// Fetch gold prices every 5 minutes
setInterval(fetchGoldPrice, 60000); // 300000 ms = 5 minutes

// Change image every 5 minutes
setInterval(showRandomImage, 5000); // 300000 ms = 5 minutes

const fullscreenImg = document.getElementById("logo-image");
fullscreenImg.addEventListener("click", toggleFullscreen);

const fullscreenButton = document.getElementById("fullscreen-button");
fullscreenButton.addEventListener("click", toggleFullscreen);

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch((err) => {
      console.error(
        `Error attempting to enable full-screen mode: ${err.message} (${err.name})`
      );
    });
  } else {
    document.exitFullscreen().catch((err) => {
      console.error(
        `Error attempting to exit full-screen mode: ${err.message} (${err.name})`
      );
    });
  }
}
