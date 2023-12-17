const API_KEY = "e77077b503c74a83ad3d4a59db08fae0";
const NEWS_CONTAINER = document.getElementById("newsContainer");

document.addEventListener("DOMContentLoaded", function() {
    // Display top headlines when the page loads
    fetchAndDisplayNews();

    // Handle search button click
    document.getElementById("searchButton").addEventListener("click", function() {
        var searchQuery = document.getElementById("searchInput").value;
        // If the search query is empty, display top headlines
        if (searchQuery.trim() === '') {
            fetchAndDisplayNews();
        } else {
            // Otherwise, fetch and display news based on the search query
            fetchAndDisplayNews(searchQuery);
        }
    });
});

function fetchAndDisplayNews(query = '') {
    // Clear existing news
    NEWS_CONTAINER.innerHTML = "";

    // Construct the API URL
    let apiUrl = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${API_KEY}`;

    // If a search query is provided, update the API URL
    if (query.trim() !== '') {
        apiUrl = `https://newsapi.org/v2/everything?q=${query}&from=2023-11-17&sortBy=publishedAt&apiKey=${API_KEY}`;
    }

    // Fetch news data
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Process the data and update the newsContainer
            if (data.articles && data.articles.length > 0) {
                data.articles.forEach(news => {
                    // Create HTML elements for each news article
                    var newsItem = document.createElement("div");
                    newsItem.className = "grid-item";

                    var newsImage = document.createElement("img");
                    newsImage.src = news.urlToImage;

                    var newsContent = document.createElement("p");
                    newsContent.innerHTML = `<strong>${news.title}</strong><br>${news.description}<br><a href="${news.url}" target="_blank">Read more</a>`;

                    // Append elements to the container
                    newsItem.appendChild(newsImage);
                    newsItem.appendChild(newsContent);
                    NEWS_CONTAINER.appendChild(newsItem);
                });
            } else {
                // Handle the case where no news articles are found
                NEWS_CONTAINER.innerHTML = "No news found.";
            }
        })
        .catch(error => console.error('Error fetching news:', error));
}