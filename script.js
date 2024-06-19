async function fetchGoldPrice() {
    try {
        const response = await fetch('https://api.chnwt.dev/thai-gold-api/latest');
        const data = await response.json();

        if (data.status === "success") {
            const priceData = data.response.price;

            document.getElementById('date').innerText = data.response.date;
            document.getElementById('update_time').innerText = data.response.update_time;

            document.getElementById('gold_bar_buy').innerText = priceData.gold_bar.buy;
            document.getElementById('gold_bar_sell').innerText = priceData.gold_bar.sell;
            document.getElementById('change_previous').innerText = priceData.change.compare_previous;
            document.getElementById('change_yesterday').innerText = priceData.change.compare_yesterday;
        } else {
            console.error('Failed to fetch gold prices');
        }
    } catch (error) {
        console.error('Error fetching gold price:', error);
    }
}

function showRandomImage() {
    const images = ['./img/img1.jpg', './img/img2.jpg', './img/img3.jpg','./img/img4.jpg','./img/img5.jpg','./img/img6.jpg','./img/img7.jpg','./img/img8.jpg','./img/img9.jpg','./img/img10.jpg','./img/img11.jpg','./img/img12.jpg']; // Add your images here
    const randomIndex = Math.floor(Math.random() * images.length);
    const randomImage = images[randomIndex];

    const imgElement = document.getElementById('random-image');
    imgElement.src = randomImage;
}

// Initial fetch and setup
fetchGoldPrice();
showRandomImage();

// Fetch gold prices every 5 minutes
setInterval(fetchGoldPrice, 300000); // 300000 ms = 5 minutes

// Change image every 5 minutes
setInterval(showRandomImage, 5000); // 300000 ms = 5 minutes

function updateTime() {
    // Get current time in UTC
    const now = new Date();

    // Convert UTC time to Thailand time (UTC+7)
    const thailandTime = new Date(now.getTime() + (7 * 60 * 60 * 1000));

    // Format the time
    const hours = thailandTime.getUTCHours().toString().padStart(2, '0');
    const minutes = thailandTime.getUTCMinutes().toString().padStart(2, '0');
    const seconds = thailandTime.getUTCSeconds().toString().padStart(2, '0');

    // Display the time
    document.getElementById('time').textContent = `${hours}:${minutes}:${seconds}`;
}

// Update time every second
setInterval(updateTime, 1000);

// Initial call to display the time immediately
updateTime();
