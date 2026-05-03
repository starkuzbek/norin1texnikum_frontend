import { getImageUrl } from '../api/api';

export default function TeacherCard({ teacher, index = 0 }) {
  const imageUrl = getImageUrl(teacher.imageFileId);

  return (
    <div
      className={`teacher-card stagger-${(index % 6) + 1}`}
      id={`teacher-card-${teacher.id}`}
    >
      <div className="teacher-card-image">
        {imageUrl ? (
          <img src={imageUrl} alt={teacher.name} loading="lazy" />
        ) : (
          <div className="teacher-card-placeholder">👨‍🏫</div>
        )}
      </div>

      <div className="teacher-card-body">
        <h3 className="teacher-card-name">{teacher.name}</h3>
        <div className="teacher-card-info">
          <span>🎂 {teacher.age} yosh</span>
          {teacher.experience && (
            <span className="teacher-card-experience">👨‍🔧 {teacher.experience} yillik malaka</span>
          )}
        </div>
        <div className="teacher-card-direction">
          🎓 {teacher.direction}
        </div>
      </div>
    </div>
  );
}
