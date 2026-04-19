const icons = ['🎓', '💻', '⚙️', '📐', '🔬', '📊', '🎨', '🏗️'];

export default function DirectionCard({ direction, index = 0 }) {
  const icon = icons[index % icons.length];

  return (
    <div
      className={`direction-card stagger-${(index % 6) + 1}`}
      id={`direction-card-${direction.id}`}
    >
      <div className="direction-card-icon">{icon}</div>
      <h3 className="direction-card-name">{direction.name}</h3>
      <p className="direction-card-description">{direction.description}</p>
    </div>
  );
}
