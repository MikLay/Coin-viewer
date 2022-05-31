import { useEffect, useState } from "react";
import axios from "axios";

const COINCAP_API = "https://api.coincap.io/v2";
const DEFAULT_ASSETS_IDS = [
  "bitcoin",
  "ethereum",
  "ripple",
  "stellar",
  "litecoin",
  "tether",
  "neo",
  "monero",
  "dogecoin",
  "binance-coin",
];

export const useMarketPrice = () => {
  const [pricesHistory, setPricesHistory] = useState();
  const [prices, setPrice] = useState();

  useEffect(() => {
    fetchAssetsHistory().then((result) => setPricesHistory(result));
    fetchAssetsPrices().then((result) => setPrice(result));
  }, []);

  const fetchAssetsPrices = async (assetsIds = DEFAULT_ASSETS_IDS) => {
    const assetsPrices = [];
    for (const asset of assetsIds) {
      await axios
        .get(`${COINCAP_API}/assets/${asset}`)
        .then(({ data }) => {
          const {
            name,
            symbol,
            supply,
            maxSupply,
            marketCapUsd,
            volumeUsd24Hr,
            priceUsd,
            changePercent24Hr,
          } = data.data;
          assetsPrices.push({
            name,
            symbol,
            supply,
            maxSupply,
            marketCapUsd,
            volumeUsd24Hr,
            priceUsd,
            changePercent24Hr,
          });
        })
        .catch(() => {});
    }
    return assetsPrices;
  };

  const fetchAssetsHistory = async (
    interval = "d1",
    assetsIds = DEFAULT_ASSETS_IDS,
  ) => {
    const assetsHistory = [];

    for (const asset of assetsIds) {
      await axios
        .get(`${COINCAP_API}/assets/${asset}/history`, {
          params: { interval: interval },
        })
        .then((resp) => {
          assetsHistory.push({ name: asset, history: resp.data.data });
        })
        .catch(() => {});
    }

    return assetsHistory;
  };

  return { fetchAssetsHistory, pricesHistory, prices };
};
