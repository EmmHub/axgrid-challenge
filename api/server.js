const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const ioOptions = {
  cors: {
    origin: '*',
  }
};

const io = socketIo(server, ioOptions);
let trades = [{status: "created",id:1}];


function getNextStatus(currentStatus) {
  const statuses = [ "accepted", "pending", "in delivery", "closed"];
  const currentIndex = statuses.indexOf(currentStatus);
  return currentIndex === statuses.length - 1 ? currentStatus : statuses[currentIndex + 1];
}
function handleClientConnection(socket) {
  const { id } = socket;
  console.log(`Client connected with id: ${id}`);

  socket.on("addTrade", (newTrade) => {
    trades = [...trades, newTrade];
  });

  socket.on("tradeUpdate", (updatedTrade) => {
    trades = trades.map(trade => {
      if (trade.id === updatedTrade.id) {
        return {...trade, status: getNextStatus(trade.status)};
      }
      return trade;
    });

    io.emit("tradeUpdate", trades);
  });
}

io.on("connection", handleClientConnection);

server.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT || 5000}`);
});
