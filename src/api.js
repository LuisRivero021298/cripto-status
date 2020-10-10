const url = "https://api.coincap.io/v2";

async function getAssets() {
  try {
    const resp = await fetch(`${url}/assets?limit=20`);
    const data = resp.json();
    return data;
  } catch (err) {
    console.error(err);
  }
}

async function getAsset(id) {
  try {
    const resp = await fetch(`${url}/assets/${id}`);
    const data = resp.json();
    return data;
  } catch (err) {
    console.error(err);
  }
}

async function assetHistory(coin) {
  try {
    const now = new Date();
    const end = now.getTime();
    now.setDate(now.getDate() - 1);
    const start = now.getTime();

    const resp = await fetch(
      `${url}/assets/${coin}/history?interval=h1&start=${start}&end=${end}`
    );
    const data = resp.json();
    return data;
  } catch (err) {
    console.error(err);
  }
}

async function getMarkets(coin) {
  try {
    const resp = await fetch(`${url}/assets/${coin}/markets?limit=4`);
    const data = resp.json();
    return data;
  } catch (err) {
    console.error(err);
  }
}

async function getExchange(id) {
  try {
    const resp = await fetch(`${url}/exchanges/${id}`);
    const data = resp.json();
    return data;
  } catch (err) {
    console.error(err);
  }
}

export default { getAssets, getAsset, assetHistory, getMarkets, getExchange };
