import { useState, useEffect } from 'react';
import TeacherCard from '../components/TeacherCard';
import { fetchTeachers } from '../api/api';

export default function TeachersPage() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTeachers() {
      try {
        const data = await fetchTeachers();
        setTeachers(data);
      } catch (err) {
        console.error('Error loading teachers:', err);
      } finally {
        setLoading(false);
      }
    }
    loadTeachers();
  }, []);

  return (
    <div id="teachers-page">
      <div className="page-header">
        <h1>👨‍🏫 O'qituvchilar</h1>
        <p>Texnikumimizning tajribali va malakali o'qituvchilari</p>
      </div>

      <section className="section">
        <div className="container">
          {loading ? (
            <div className="loading">
              <div className="loading-spinner"></div>
              <div className="loading-text">Yuklanmoqda...</div>
            </div>
          ) : teachers.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">👨‍🏫</div>
              <div className="empty-state-text">Hozircha o'qituvchilar qo'shilmagan</div>
            </div>
          ) : (
            <div className="card-grid">
              {teachers.map((teacher, idx) => (
                <TeacherCard key={teacher.id} teacher={teacher} index={idx} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
