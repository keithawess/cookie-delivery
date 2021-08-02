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
      json = {...json, success: true, data: "Congratulations! The neighbor has moved in!"}
    }
  } catch (err) {
      console.log(err);

    json.error = "Failed to add neighbor";
  } finally {
    return res.send(json);
  }
}

module.exports = {addNeighbor};
