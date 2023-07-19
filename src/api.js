const ROOT_URL =
  "https://wr4a6p937i.execute-api.ap-northeast-2.amazonaws.com/dev";

export async function fetchSearchResult(keyword) {
  try {
    const response = await fetch(`${ROOT_URL}/languages?keyword=${keyword}`);
    const data = await response.json();
    return data;
  } catch (e) {
    console.log("❌", e);
    return;
  }
}
