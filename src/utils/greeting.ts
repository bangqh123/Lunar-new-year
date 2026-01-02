export function getGreetingFromEncodedURL() {
  const p = new URLSearchParams(location.search)
  const d = p.get("data")
  if (!d) return { from: "Bạn", message: "Chúc mừng năm mới!" }
  return JSON.parse(decodeURIComponent(atob(d)))
}
