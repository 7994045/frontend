javascript
const tg = window.Telegram.WebApp;

function searchTours() {
    const params = {
        from: document.getElementById('from').value,
        to: document.getElementById('to').value,
        dateFrom: document.getElementById('dateFrom').value,
        dateTo: document.getElementById('dateTo').value,
        nights: document.getElementById('nights').value,
        adults: document.getElementById('adults').value
    };
    
    tg.showLoading();
    
    fetch(API_URL + '/api/tours/search', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(params)
    })
    .then(res => res.json())
    .then(data => {
        displayResults(data);
        tg.hideLoading();
    });
}

function displayResults(tours) {
    const container = document.getElementById('results');
    container.innerHTML = tours.map(tour => `
        <div class="tour-card">
            <img src="${tour.hotelImage}" alt="${tour.hotelName}">
            <div class="tour-info">
                <h3>${tour.hotelName} ⭐️${tour.rating}</h3>
                <p>${tour.country}, ${tour.city}</p>
                <p class="price">${tour.price} ₽</p>
                <button onclick="tg.openLink('${tour.bookUrl}')">Бронировать</button>
            </div>
        </div>
    `).join('');
    
    tg.ready();
}
