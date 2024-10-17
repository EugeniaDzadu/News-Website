const searchButton = document.getElementById('btnSearch');
const newsInput = document.getElementById('searchNews');
const preview = document.getElementById('previewContainer'); 
const newsForm = document.getElementById('newsForm');
const loader = document.querySelector('.loader');
const loadMoreButton = document.getElementById('loadMore');

let currentPage = 1;
let totalResults = 0;
const pageSize = 4; // Number of articles on a page


// Function to fetch news
function fetchNews(url) {
    loader.style.display = 'block'; // Show loader

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("API Response Data:", data); // Log the API response for debugging

            loader.style.display = 'none'; // Hide loader
            preview.innerHTML = '';

            if (data.articles && data.articles.length > 0) {
                displayArticles(data.articles);
                totalResults = data.totalResults;  // Total articles available for pagination

                // Show or hide the Load More button based on available results
                loadMoreButton.style.display = (currentPage * pageSize < totalResults) ? 'block' : 'none';
            } else {
                console.warn("No articles found in the response");
                preview.innerHTML = 'No articles found';
            }
        })
        .catch(error => {
            console.error('Error:', error); // Log the error for debugging
            loader.style.display = 'none'; // Hide loader
            preview.innerHTML = 'An error occurred while fetching the news.';
        });
}


// Function to display articles
function displayArticles(articles) {
    articles.forEach(article => {
        if (!article.title.includes('[Removed]') && !article.description.includes('[Removed]')) {
            const articleElement = document.createElement('div');
            articleElement.classList.add('article');
            articleElement.innerHTML = `
                <h3>${article.title}</h3>
                <img src="${article.urlToImage || 'https://via.placeholder.com/150'}" alt="Article Image" class="article-image">
                <p>${article.description || 'No description available'}</p>
            `;

            // Navigate to a new page with article details when clicked
            articleElement.addEventListener('click', () => {
                const params = new URLSearchParams({
                    title: article.title,
                    description: article.description,
                    urlToImage: article.urlToImage,
                    content: article.content,
                    publishedAt: article.publishedAt,
                    url: article.url
                });
                window.location.href = `article.html?${params.toString()}`;
            });

            preview.appendChild(articleElement);
        }
    });
}

// Fetch top headlines when the page loads
window.onload = function() {
    const apiKey = 'a5e5913aa7a844f1bf440b73e7d18923'; // Your API Key
    const topHeadlinesUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=${pageSize}&page=${currentPage}&apiKey=${apiKey}`;
    fetchNews(topHeadlinesUrl);
};

// Search functionality
newsForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const query = newsInput.value.trim();
    if (query === "") {
        preview.innerHTML = "Please enter a search term.";
        return;
    }

    const apiKey = 'a5e5913aa7a844f1bf440b73e7d18923';
    currentPage = 1; // 
    const searchUrl = `https://newsapi.org/v2/everything?q=${query}&sortBy=popularity&pageSize=${pageSize}&page=${currentPage}&apiKey=${apiKey}`;
    preview.innerHTML = ''; 
    fetchNews(searchUrl);
});

// Load more articles when clicking "Load More"
loadMoreButton.addEventListener('click', () => {
    currentPage++; // Increment the page number
    const apiKey = 'a5e5913aa7a844f1bf440b73e7d18923'; // Your API Key
    const currentQuery = newsInput.value.trim() || 'latest'; // Get the current query or set a default
    const searchUrl = `https://newsapi.org/v2/everything?q=${currentQuery}&sortBy=popularity&pageSize=${pageSize}&page=${currentPage}&apiKey=${apiKey}`;

    fetchNews(searchUrl); // Fetch more headlines
});
