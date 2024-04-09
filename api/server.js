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
let trades = [{
  energyType: "Solar",
  price: 100,
  minimumPurchaseQuantity: 500,
  location: {
    latitude: 35.6895,
    longitude: 139.6917
  },
  capacity: 50,
  energyOutputPredictions: "low",
  timeOfAvailability: "day",
  certifications: ["ISO-14001", "REC"],
  contractTerms: {
    durationAmount: "12",
    durationType: "months",
    earlyTerminationPenalty: true,
    otherLegalConditions: "N/A"
  },
  paymentTerms: {
    paymentMethod: "Bank Transfer",
    paymentSchedule: "Monthly"
  },
  status:"created",
  id:2342342
},{
  energyType: "Wind",
  price: 100,
  minimumPurchaseQuantity: 500,
  location: {
    latitude: 35.6895,
    longitude: 139.6917
  },
  capacity: 50,
  energyOutputPredictions: "low",
  timeOfAvailability: "day",
  certifications: ["ISO-14001", "REC"],
  contractTerms: {
    durationAmount: "12",
    durationType: "months",
    earlyTerminationPenalty: true,
    otherLegalConditions: "N/A"
  },
  paymentTerms: {
    paymentMethod: "Bank Transfer",
    paymentSchedule: "Monthly"
  },
  status:"created",
  id:234234222
}];


function getNextStatus(currentStatus) {
  const statuses = [ "accepted", "pending", "in delivery", "closed"];
  const currentIndex = statuses.indexOf(currentStatus);
  return currentIndex === statuses.length - 1 ? currentStatus : statuses[currentIndex + 1];
}
function handleClientConnection(socket) {
  const { id } = socket;
  console.log(`Client connected with id: ${id}`);

  socket.on("addTrade", (newTrade) => {
    trades = [newTrade,...trades];
    socket.emit("trades", trades);
  });

  socket.on("tradeUpdate", (id) => {
    trades = trades.map(trade => {
      if (trade.id === id) {
        return {...trade, status: getNextStatus(trade.status)};
      }
      return trade;
    });

    socket.emit("trades", trades);
  });
  io.emit("trades", trades);
}

io.on("connection", handleClientConnection);

server.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT || 5000}`);
});
