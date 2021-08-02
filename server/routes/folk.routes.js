const express = require("express");
const router = express.Router();
const Filter = require("bad-words");
const { addNeighbor, getNeighborByAddress } = require("../models/folk.model");
let filter = new Filter();

router.post("/add", (req, res) => {
  const { neighbor } = req.body;

  if (validNeighbor(neighbor)) {
    return addNeighbor(res, neighbor);
  } else {
    res.send({
      success: false,
      data: null,
      error: "Invalid data provided",
    });
  };
});

router.get("/get", (req, res) => {
    const { address } = req.body;

    if (address) {
        getNeighborByAddress(res, address);
    } else {
        res.send ({
            success: false,
            data: null,
            error: "Invalid data provided",
        });
    };
});

function validNeighbor(neighbor) {
  let { address, house, face, color, roundness, height } = neighbor;
  let output = true;

  if (neighbor.name) {
    filter.isProfane(neighbor.name) ? (neighbor.name = "Bobby Pottymouth") : "";
  } else {
    output = false;
  }
  if (
    address &&
    address.split(" ").length === 3 &&
    house &&
    house < 3 &&
    face &&
    face < 4 &&
    color &&
    roundness &&
    roundness <= 50 &&
    height &&
    height <= 100
  ) {
    arr = address.split(" ");
    if (
      isNaN(arr[0]) ||
      ((arr[1] !== "Butterscotch" &&
        arr[1] !== "Gingerbread") ||
        (arr[2] !== "Ave" &&
        arr[2] !== "St"))
    ) {
      output = false;
    }
  } else {
    output = false;
  }

  return output;
}

module.exports = router;
