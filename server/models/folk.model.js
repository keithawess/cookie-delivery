const query = require("../config/mysql.conf");

async function addNeighbor(res, neighbor) {
  let json = { success: false, data: null, error: null };
  try {
    const neighbors = await query("SELECT * FROM folk WHERE address = ?", [
      neighbor.address,
    ]);

    if (neighbors.length !== 0) {
      json.error =
        "Somebody already lives at this address. Please choose another address.";
    } else {
      await query(
        "INSERT INTO folk (name, address, house, face, color, roundness, height) VALUES (?,?,?,?,?,?,?)",
        [
          neighbor.name,
          neighbor.address,
          neighbor.house,
          neighbor.face,
          neighbor.color,
          neighbor.roundness,
          neighbor.height,
        ]
      );
      json = {
        ...json,
        success: true,
        data: "Congratulations! The neighbor has moved in!",
      };
    }
  } catch (err) {
    console.log(err);

    json.error = "Failed to add neighbor";
  } finally {
    return res.send(json);
  }
}

async function getNeighborByAddress(res, address) {
  let json = { success: false, data: null, error: null };
  try {
    const neighbor = await query("SELECT * FROM folk WHERE address = ?", [
      address,
    ]);
    if (neighbor.length === 0) {
      json.error = "Nobody lives at the address provided!";
    } else {
      json = {
        ...json,
        success: true,
        data: {
          name: neighbor[0].name,
          address: neighbor[0].address,
          house: neighbor[0].house,
          face: neighbor[0].face,
          color: neighbor[0].color,
          roundness: neighbor[0].roundness,
          height: neighbor[0].height,
        },
      };
    }
  } catch (err) {
    console.log(err);
    json.error = "Failed to get Neighbors";
  } finally {
    return res.send(json);
  }
}

async function getRandomNeighbors(res) {
  let json = { success: false, data: null, error: null };
  try {
    const neighbors = await query(
      "SELECT * FROM folk ORDER BY RAND() LIMIT 10"
    );
    json = { ...json, success: true, data: neighbors };
  } catch (err) {
    console.log(err);
    json.error = "Failed to round up neighbors";
  } finally {
    return res.send(json);
  }
}

async function getPopulation(res) {
  let json = { success: false, data: null, error: null };
  try {
    const count = await query("SELECT COUNT(*) FROM folk");
    json = { ...json, success: true, data: count[0]["COUNT(*)"]};
  } catch (err) {
    json.error = "Failed to round up neighbors";
  } finally {
    return res.send(json);
  }
}

module.exports = { addNeighbor, getNeighborByAddress, getRandomNeighbors, getPopulation };
