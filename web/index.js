const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const nunjucks = require("nunjucks");
const dotenv = require("dotenv");
const passport = require("passport");
const path = require("path");
const swaggerUi = require("swagger-ui-express");
const yaml = require("yamljs");
const { sequelize } = require("./models");

const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const diningRouter = require("./routes/dining");
const keywordRouter = require("./routes/keyword");

dotenv.config();
const passportConfig = require("./passport");
const app = express();
passportConfig();
const swaggerSpec = yaml.load(path.join(__dirname, "./swagger/build.yaml"));
app.set("port", process.env.PORT || 3000);
app.set("view engine", "html");
nunjucks.configure("views", {
  express: app,
  watch: true,
});

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("DB Connection Completed");
  })
  .catch((err) => {
    console.error(err);
  });

app.use(morgan("dev"));
app.use("/", express.static(path.join(__dirname, ""))); //TODO: 왜 이렇게 되는지? 확인
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
  if (req.user) {
    res.locals.user = req.user;
  }
  next();
});
app.get("/", (req, res) => {
  res.redirect("/dining");
});
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/dining", diningRouter);
app.use("/keyword", keywordRouter);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 이 존재하지 않습니다.`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  console.log(err);
  res.json(err).send("error.html");
});

app.listen(app.get("port"), () => {
  console.log("Server is running on ", app.get("port"));
});
