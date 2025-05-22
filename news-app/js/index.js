let recentArticle = document.getElementById("recent-articles");

const fetchAPI = async () => {
  try {
    const res = await axios.get(
      "https://newsapi.org/v2/top-headlines?country=us&apiKey=bfadd5c85afa48bca3d1a530a57a049a"
    );

    const data = res.data;

    recentArticle.innerHTML = data.articles.map((article, idx) => {
      return `<div class="article-post" data-url="${article.url}" id="${idx}">
              <div class="post-note">
                  <h3>${article.title}</h3>
                  <p>${article.content || "No content available"}</p>
                  <strong class="read-time">${article.publishedAt}</strong>
              </div>
              <div class="post-pic">
              <img src="${article.urlToImage || 'https://via.placeholder.com/150'}" alt="${
        article.author || "Unknown"
      }" />
              </div>
          </div>
          <hr />`;
    }).join('');

    // Add event listeners after content is loaded
    document.querySelectorAll('.article-post').forEach(article => {
      article.addEventListener('click', function() {
        const url = this.getAttribute('data-url');
        window.location.href = `./read?url=${url}`;
      });
    });
  } catch (error) {
    console.error("Error fetching articles:", error);
    recentArticle.innerHTML = "<p>Error loading articles. Please try again later.</p>";
  }
};


fetchAPI();
