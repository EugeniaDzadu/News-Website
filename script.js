const searchButton = document.getElementById('btnSearch');
const newsInput = document.getElementById('searchNews');
const preview = document.getElementById('preview');
const newsForm = document.getElementById('newsForm');
const loader = document.querySelector('.loader');

newsForm.addEventListener('submit', function(event) {
    event.preventDefault();

    // Get the search term entered by the user
    const query = newsInput.value.trim();

    // Log the search term to the console
    console.log('Search term:', query);

    if (query === "") {
        // If no search term is entered, show a message
        preview.innerHTML = "Please enter a search term.";
        return;
    }

    // Paste the API key here and use this variable instead
    const apiKey = 'a5e5913aa7a844f1bf440b73e7d18923';

    // Fetch the articles based on the input the user provides
    fetch(`https://newsapi.org/v2/everything?q=${query}&sortBy=popularity&apiKey=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            // Log the results of the search to the console
            console.log('Search results:', data);

            // Clear the preview container to allow the next search to take place
            preview.innerHTML = '';

            // Check if there are any articles returned
            if (data.articles && data.articles.length > 0) {
                // Create a loop here through each article and show its title and description
                data.articles.forEach(article => {
                    const articleElement = document.createElement('div');
                    articleElement.innerHTML = `
                        <h3>${article.title}</h3>
                        <p>${article.description || 'No description'}</p>
                        <a href="${article.url}" target="_blank">Read more</a>
                        <hr>`;
                        
                    preview.appendChild(articleElement);
                });
            } else {
                // No articles are found? Show a message
                preview.innerHTML = 'No articles found';
            }
        })
        .catch(error => {
            console.error('Error fetching the news:', error);
            preview.innerHTML = 'An error occurred while fetching the news.';
        });
});
