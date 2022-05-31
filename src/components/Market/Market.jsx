import React from "react";
import { Table } from "antd";
import { useMarketPrice } from "../../hooks/useMarketPrice";
import Plot from "react-plotly.js";
import moment from "moment";

function CoinCharts() {
  const { pricesHistory, prices } = useMarketPrice();

  const columns = [
    {
      title: "name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "symbol",
      dataIndex: "symbol",
      key: "symbol",
    },
    {
      title: "supply",
      dataIndex: "supply",
      key: "supply",
    },
    {
      title: "maxSupply",
      dataIndex: "maxSupply",
      key: "maxSupply",
    },
    {
      title: "marketCapUsd",
      dataIndex: "marketCapUsd",
      key: "marketCapUsd",
    },
    {
      title: "volumeUsd24Hr",
      dataIndex: "volumeUsd24Hr",
      key: "volumeUsd24Hr",
    },
    {
      title: "priceUsd",
      dataIndex: "priceUsd",
      key: "priceUsd",
    },
    {
      title: "changePercent24Hr",
      dataIndex: "changePercent24Hr",
      key: "changePercent24Hr",
    },
  ];

  const formatData = (assets) => {
    const data = [];

    for (const asset of assets) {
      const x = [];
      const y = [];

      asset.history.forEach((point) => {
        y.push(point.priceUsd);
        x.push(moment(point.time).format("MM/DD/yyyy HH:mm:ss"));
        // console.log(moment.unix(point.time).utc().format("MM/DD/YYYY HH:mm:ss"));
        console.log(point.time);
      });

      data.push({
        x,
        y,
        type: "scatter",
        mode: "lines",
        marker: { cauto: true },
        name: asset.name,
      });
    }
    console.log(data);
    return data;
  };

  return (
    <div style={{ width: "65vw", padding: "15px" }}>
      <h1>📊 Prices</h1>
      {pricesHistory && (
        <Plot
          data={formatData(pricesHistory)}
          layout={{
            autosize: true,
            title: "Coins Price USD",
            xaxis: { autorange: true },
          }}
        />
      )}
      {prices && (
        <Table columns={columns} dataSource={prices} scroll={{ x: 1300 }} />
      )}
    </div>
  );
}

export default CoinCharts;
