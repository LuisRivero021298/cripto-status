const url = "https://api.coincap.io/v2";

async function getAssets() {
  const resp = await fetch(`${url}/assets?limit=20`);
  const data = resp.json();
  return data;
}

async function getAsset(id) {
  const resp = await fetch(`${url}/assets/${id}`);
  const data = resp.json();
  return data;
}

async function assetHistory(coin) {
  const now = new Date();
  const end = now.getTime();
  now.setDate(now.getDate() - 1);
  const start = now.getTime();

  const resp = await fetch(
    `${url}/assets/${coin}/history?interval=h1&start=${start}&end=${end}`
  );
  const data = resp.json();
  return data;
}

export default { getAssets, getAsset, assetHistory };
