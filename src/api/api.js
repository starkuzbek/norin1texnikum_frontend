const API_BASE = 'https://norin1texnikum-backend-1.onrender.com/api';

export async function fetchHome() {
  const res = await fetch(`${API_BASE}/home`);
  if (!res.ok) throw new Error('Failed to fetch home data');
  return res.json();
}

export async function fetchNews(category = 'all') {
  const params = category && category !== 'all' ? `?category=${category}` : '';
  const res = await fetch(`${API_BASE}/news${params}`);
  if (!res.ok) throw new Error('Failed to fetch news');
  return res.json();
}

export async function fetchNewsById(id) {
  const res = await fetch(`${API_BASE}/news/${id}`);
  if (!res.ok) throw new Error('Failed to fetch news item');
  return res.json();
}

export async function fetchTeachers() {
  const res = await fetch(`${API_BASE}/teachers`);
  if (!res.ok) throw new Error('Failed to fetch teachers');
  return res.json();
}

export async function fetchDirections() {
  const res = await fetch(`${API_BASE}/directions`);
  if (!res.ok) throw new Error('Failed to fetch directions');
  return res.json();
}

export function getImageUrl(fileId) {
  if (!fileId) return null;
  return `${API_BASE}/image/${fileId}`;
}
