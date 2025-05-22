const express = require("express");
const path = require("path");
const axios = require("axios");
const cheerio = require("cheerio");
const PORT = 4000;
const app = express();

// Serve static files from the 'html' directory
app.use(express.static(path.join(__dirname, "..")));
app.use(express.json());

app.get("/", (req, res) => {
  // res.sendFile(path.dirname('../html/') + "index.html");
  res.sendFile(path.join(__dirname, "../html/index.html"));
});

app.get("/read", (req, res) => {
  res.sendFile(path.join(__dirname, "../html/reader.html"));
});

// Route to scrape a webpage
app.get("/scrape", async (req, res) => {
  try {
    const url = req.query.url;

    if (!url) {
      return res.status(400).json({ error: "URL parameter is required" });
    }

    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    // Extract page content
    const pageContent = {
      title: $("title").text(),
      body: $("body").text(),
      time: $("time").text(),
      poster: $("img.sc-4abb68ca-0.ldLcJe").attr("src"), // Get src attribute of first image
      shortRead: $("p.ArticleHeader_ahSubtitle__4qa5C").text(),
      // You can add more specific selectors as needed
      paragraphs: $("p")
        .map((i, el) => $(el).text())
        .get(),
      links: $("a")
        .map((i, el) => ({
          text: $(el).text(),
          href: $(el).attr("href"),
        }))
        .get(),
      // Extract all image sources
    //   images: $("img")
    //     .map((i, el) => $(el).attr("src"))
    //     .get(),
    };

    res.json(pageContent);
  } catch (error) {
    console.error("Scraping error:", error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
