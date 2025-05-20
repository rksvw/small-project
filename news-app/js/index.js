let recentArticle = document.getElementById("recent-articles");

const fetchAPI = async () => {
  const res = await axios.get('https://newsapi.org/v2/top-headlines?country=us&apiKey=bfadd5c85afa48bca3d1a530a57a049a');

  const data = await res.data;
  data.articles.map((article, idx) => {
    console.log(article);

  });

  recentArticle.innerHTML = data.articles.map((article, idx) => {
    return `<div class="article-post" id="${idx}">
            <div class="post-note">
                <h3>${article.title}</h3>
                <p>${article.content || "No content available"}</p>
                <strong class="read-time">${article.publishedAt}</strong>
            </div>
            <div class="post-pic">
            <img src="${article.urlToImage}" alt="${article.author || 'Unknown'}" />
            </div>
        </div>`
  })
};

fetchAPI();
