async function fetchGoldPrice(retryCount = 3) {
  const fallbackData = localStorage.getItem("goldPriceData");
  const dataUrl = "https://monitor-laikanok-backend.vercel.app/proxy";

  try {
    const specialItemResponse = await fetch(dataUrl);
    const specialItemData = await specialItemResponse.json();

    const targetItem = specialItemData.find(
      (item) => item.name === "\u0e2a\u0e21\u0e32\u0e04\u0e21\u0e2f"
    );

    if (targetItem && retryCount === 3) {
      // Validate only on the first try
      if (validateGoldData(targetItem)) {
        updateGoldPrice(targetItem);
        localStorage.setItem("goldPriceData", JSON.stringify({ targetItem }));
      } else {
        console.log("Invalid data");
        if (fallbackData) displayFallbackData(JSON.parse(fallbackData));
      }
    } else if (targetItem) {
      // Skip validation on retries
      updateGoldPrice(targetItem);
      localStorage.setItem("goldPriceData", JSON.stringify({ targetItem }));
    } else {
      console.log("Item not found");
      if (fallbackData) displayFallbackData(JSON.parse(fallbackData));
    }

    const response = await fetch("https://api.chnwt.dev/thai-gold-api/latest");
    const data = await response.json();

    if (data.status === "success") {
      const priceData = data.response.price;

      document.getElementById("date").innerText = data.response.date;
      document.getElementById("update_time").innerText =
        data.response.update_time;

      // Uncomment and use if required
      // document.getElementById("change_previous").innerText = priceData.change.compare_previous;
      // document.getElementById("change_yesterday").innerText = priceData.change.compare_yesterday;

      localStorage.setItem("goldPriceData", JSON.stringify({ data }));
    } else {
      console.error("Failed to fetch gold prices");
      if (fallbackData) displayFallbackData(JSON.parse(fallbackData));
    }
  } catch (error) {
    console.error("Error fetching gold price:", error);
    if (retryCount > 0) {
      setTimeout(() => fetchGoldPrice(retryCount - 1), 1000);
    } else if (fallbackData) {
      displayFallbackData(JSON.parse(fallbackData));
    }
  }
}

function validateGoldData(data) {
  if (data) {
    const isValidName =
      typeof data.name === "string" && data.name.trim() !== "";
    const isValidBid = !isNaN(parseFloat(data.bid));
    const isValidAsk = !isNaN(parseFloat(data.ask));
    const isValidDiff = !isNaN(parseFloat(data.diff));

    return isValidName && isValidBid && isValidAsk && isValidDiff;
  }
  return false;
}

function updateGoldPrice(targetItem) {
  const currentBid = document.getElementById("gold_bar_sell").innerText;
  const currentAsk = document.getElementById("gold_bar_buy").innerText;
  const newBid = parseFloat(targetItem.bid).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const newAsk = parseFloat(targetItem.ask).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  if (currentBid !== newBid) {
    document.getElementById("gold_bar_sell").innerText = newBid;
  }
  if (currentAsk !== newAsk) {
    document.getElementById("gold_bar_buy").innerText = newAsk;
  }
}

function displayFallbackData(data) {
  if (data.targetItem) {
    const targetItem = data.targetItem;
    updateGoldPrice(targetItem);
  }

  if (data.data) {
    const priceData = data.data.response.price;
    document.getElementById("date").innerText = data.data.response.date;
    document.getElementById("update_time").innerText =
      data.data.response.update_time;
    // Uncomment and use if required
    // document.getElementById("change_previous").innerText = priceData.change.compare_previous;
    // document.getElementById("change_yesterday").innerText = priceData.change.compare_yesterday;
  }
}

function clearCache() {
  localStorage.removeItem("goldPriceData");
  console.log("Cache cleared");
}

// Predefined list of images
let cntImg = 0;
const numberOfImages = 70; // Update this to the total number of images you have

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
clearCache();

// Fetch gold prices
setInterval(fetchGoldPrice, 10000); // 10000 ms = 10 sec

// Change image
setInterval(showRandomImage, 8000); // 8000 ms = 8 sec

// Clear cache every 1 hour
setInterval(clearCache, 3600000); // 3600000 ms = 1 hour

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
