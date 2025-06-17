// utils/formatDate.js
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  
  if (isNaN(date.getTime())) {
    return '';
  }

  if (date.toDateString() === now.toDateString()) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
  
  if (date.getFullYear() === now.getFullYear()) {
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  }
  
  return date.toLocaleDateString([], { year: 'numeric', month: 'short', day: 'numeric' });
};