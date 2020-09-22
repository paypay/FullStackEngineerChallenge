export const getQuery = (key) => {
  if (!process.client) { return false }
  if (document.location.search === '') { return false }
  const found = document.location.search.split('?')[1].split('&').find(seg => seg.split('=')[0] === key)
  if (!found) { return false }
  return decodeURIComponent(found.split('=')[1])
}
