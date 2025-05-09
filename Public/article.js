document.addEventListener('DOMContentLoaded', async function () {
    const params = new URLSearchParams(window.location.search);
    const articleId = params.get('id');
    const main = document.getElementById('article-main');

    if (!articleId) {
        main.innerHTML = '<p>Article not found.</p>';
        return;
    }

    // Fetch all articles
    const res = await fetch('/articles');
    const articles = await res.json();
    const article = articles.find(a => a.id == articleId);

    if (!article) {
        main.innerHTML = '<p>Article not found.</p>';
        return;
    }

    // Article summary (first paragraph)
    const summary = article.content.split('\n\n')[0];

    // Find recommended articles (same tag, exclude current)
    const related = articles.filter(a =>
        a.id != article.id && a.tags.some(tag => article.tags.includes(tag))
    );

    // Format full content as paragraphs
    const fullContent = article.content
        .split('\n\n')
        .map(para => `<p>${para}</p>`)
        .join('');

    main.innerHTML = `
        <div class="article-image" style="text-align:center;">
            <img src="${article.image}" alt="${article.title}" style="max-width:100%;border-radius:10px;">
        </div>
        <h1 style="text-align:center;">${article.title}</h1>
        <div style="text-align:center;margin-bottom:20px;">
            ${article.tags.map(tag => `<span class="clickable-tag">${tag}</span>`).join(' ')}
        </div>
        <div class="article-content-label" id="content">Content</div>
        <div class="article-content-area">${fullContent}</div>
        <hr>
        <h2 id="recomanded">Recommended articles:</h2>
        <div class="recommended-scroll" id="recommended-scroll" style="display:flex;overflow-x:auto;gap:20px;padding:10px 0 30px 0;">
            ${related.length === 0 ? '<p>No related articles.</p>' : related.map(r => `
                <div class="related-post" style="min-width:250px;max-width:300px;background:#fff;border-radius:8px;box-shadow:0 2px 8px rgba(0,0,0,0.1);padding:10px;">
                    <img src="${r.image}" alt="${r.title}" style="width:100%;height:120px;object-fit:cover;border-radius:6px;">
                    <h4>${r.title}</h4>
                    <p style="font-size:0.95em;">${r.content.split('\n\n')[0].substring(0, 80)}...</p>
                    <a href="article.html?id=${r.id}" class="read-article-btn">Read Article</a>
                </div>
            `).join('')}
        </div>
        <div style="text-align:center; margin-top: 5px;">
            <a href="index.html" class="submit-btn">← Back to All Articles</a>
        </div>
    `;
});