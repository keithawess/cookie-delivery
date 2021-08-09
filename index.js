require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
const passport = require("passport");
const passportConf = require("./server/config/passport.conf");
const cookieParser = require("cookie-parser");
const userRoutes = require("./server/routes/users.routes");
const folkRoutes = require("./server/routes/folk.routes");

app.use(express.json());

// app.enable('trust proxy');
// app.use((req, res, next) => {
//     req.secure ? next() : res.redirect('https://' + req.headers.host + req.url)
// });

passportConf(passport);
app.use(cookieParser());
// app.use(express.static(__dirname + "/build"));
app.use(passport.initialize());

app.use("/api/users", userRoutes);
app.use("/api/folk", folkRoutes);

// app.get("*", (req, res) => {
//     return res.sendFile("/build/index.html", {root: __dirname + "/" });
// })

app.listen(PORT, () => console.log("Connected"));
