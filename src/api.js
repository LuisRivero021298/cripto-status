const url = "https://api.coincap.io/v2";

async function getAssets() {
  const resp = await fetch(`${url}/assets?limit=20`);
  const data = resp.json();
  return data;
}

export default { getAssets };
