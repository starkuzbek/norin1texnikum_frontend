import { useState, useEffect } from 'react';
import CategoryFilter from '../components/CategoryFilter';
import NewsCard from '../components/NewsCard';
import { fetchNews } from '../api/api';

export default function NewsPage() {
  const [allNews, setAllNews] = useState([]);
  const [category, setCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([{ key: 'all', label: 'Barchasi' }]);

  useEffect(() => {
    async function loadNews() {
      setLoading(true);
      try {
        const data = await fetchNews('all');
        setAllNews(data);
        
        // Extract unique categories dynamically
        const uniqueKeys = new Set(data.map(item => item.category));
        
        // Define known labels, format unknown ones gracefully
        const knownLabels = {
          'texnikum_hayoti': 'Texnikum hayoti',
          'oquvchilar_yutuqlari': "O'quvchilar yutuqlari",
          'oqituvchilar_yutuqlari': "O'qituvchilar yutuqlari",
          'fan': 'Fan',
          'sport': 'Sport'
        };
        
        const dynamicCategories = [{ key: 'all', label: 'Barchasi' }];
        for (const key of uniqueKeys) {
            if (!key) continue;
            const label = knownLabels[key] || key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' ');
            dynamicCategories.push({ key, label });
        }
        setCategories(dynamicCategories);
        
      } catch (err) {
        console.error('Error loading news:', err);
      } finally {
        setLoading(false);
      }
    }
    loadNews();
  }, []);

  const filteredNews = category === 'all' ? allNews : allNews.filter(item => item.category === category);

  return (
    <div id="news-page">
      <div className="page-header">
        <h1>📰 Yangiliklar</h1>
        <p>Texnikumimizdagi eng so'nggi yangiliklar va voqealar</p>
      </div>

      <section className="section">
        <div className="container">
          <CategoryFilter active={category} onChange={setCategory} categories={categories} />

          {loading ? (
            <div className="loading">
              <div className="loading-spinner"></div>
              <div className="loading-text">Yuklanmoqda...</div>
            </div>
          ) : filteredNews.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">📭</div>
              <div className="empty-state-text">Hozircha yangiliklar yo'q</div>
            </div>
          ) : (
            <div className="card-grid">
              {filteredNews.map((item, idx) => (
                <NewsCard key={item.id} news={item} index={idx} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
