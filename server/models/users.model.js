const query = require("../config/mysql.conf");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

async function signup(res, username, password){
    let json = { success: false, data: null, error: null};
    try {
        const users = await query("SELECT * FROM users WHERE username = ?", [
            username,
        ]);
        if (users.length !== 0) {
            json.error = "Please choose another username."
        } else {
            const hashed = await bcrypt.hash(password, 10);
            const uuid = uuidv4();
            await query("INSERT INTO users (uuid, username, password) VALUES (?,?,?)", [uuid, username, hashed]);
            json = { ...json, success: true, data: "Signup was successful!"};
        }

    } catch (err) {
        json.error = "Signup failed";
    } finally {
        return res.send(json);
    }
}

async function login(res, username, password)
{
    let json = {success: false, data: null, error: null};
    try {
        const users = await query("SELECT * FROM users WHERE username = ?", [username]);
        const user = users[0] || { password: "1"};
        const matches = await bcrypt.compare(password, user.password);
        if (matches) {
            json = {
                ...json, success: matches, data: {username}
            };
        } else { json.error = "Username or Password were incorrect. Please try again."}
    } catch (err) {
        json.error = "Login failed";
    } finally {
        return res.send(json);
    }
}

module.exports = {signup, login};