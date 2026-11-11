// Small helpers shared by the home sections and the post/project pages.

export const byDate = (a: { data: { date: string } }, b: { data: { date: string } }) =>
  new Date(b.data.date).getTime() - new Date(a.data.date).getTime();

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-GB', { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' });
