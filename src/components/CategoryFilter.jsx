const categories = [
  { key: 'all', label: 'Barchasi' },
  { key: 'texnikum_hayoti', label: 'Texnikum hayoti' },
  { key: 'oquvchilar_yutuqlari', label: "O'quvchilar yutuqlari" },
  { key: 'oqituvchilar_yutuqlari', label: "O'qituvchilar yutuqlari" },
  { key: 'fan', label: 'Fan' },
  { key: 'sport', label: 'Sport' },
];

export default function CategoryFilter({ active, onChange, categories = [] }) {
  // Use passed categories if available, else fallback to default statically generated if empty
  const displayCategories = categories.length > 0 ? categories : [
    { key: 'all', label: 'Barchasi' }
  ];

  return (
    <div className="category-filter" id="category-filter">
      {displayCategories.map((cat) => (
        <button
          key={cat.key}
          className={`category-btn ${active === cat.key ? 'active' : ''}`}
          onClick={() => onChange(cat.key)}
          id={`category-btn-${cat.key}`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}
