// Function to extract query parameters from the URL
function getQueryParams() {
    const urlParams = new URLSearchParams(window.location.search);
    return {
        title: urlParams.get('title'),
        description: urlParams.get('description'),
        urlToImage: urlParams.get('urlToImage'),
        content: urlParams.get('content'),
        publishedAt: urlParams.get('publishedAt'),
        url: urlParams.get('url')
    };
}

// Populate article details based on URL parameters
window.onload = function() {
    const article = getQueryParams();

    document.getElementById('articleTitle').textContent = article.title;
    document.getElementById('articleDate').textContent = `Published: ${new Date(article.publishedAt).toLocaleString()}`;
    document.getElementById('articleContentText').textContent = article.content || article.description || 'No content available';
    document.getElementById('articleUrl').href = article.url;

    const articleImage = document.getElementById('articleImage');
    articleImage.src = article.urlToImage || 'default-image.jpg';
    articleImage.alt = article.title;
};
