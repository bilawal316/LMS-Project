const jwt = require("jsonwebtoken");
const config = require("./config/config.json")
const getSession = require ("./models/sessionModel");
const sessionModel = require("./models/sessionModel");


module.exports = {
    trainee: async (req, res, next) => {
        try {
          const token = req.cookies.auth;
          if (!token || token == undefined) {
            return res.send({
              error: "unauthorized User",
            });
          }

          jwt.verify(token, config.jwt.secret, async (error, user,) => {
            if (error) {
              return res.send({
                error: error,
              });
            }
              if (user.role !== "trainee") {
              return res.send({
                error: "unauthorized User",
              });
            }
            next();
          });
        } catch (error) {
          return res.send({
            error: "unauthorized User",
          });
        }
      },
      instructor: async (req, res, next) => {
        try {
          const token = req.cookies.auth;
          if (!token || token == undefined) {
            return res.send({
              error: "unauthorized User",
            });
          }
          jwt.verify(token, config.jwt.secret, async (error, user) => {
            if (error) {
              return res.send({
                error: error,
              });
            }
            console.log(user.role);
            if (user.role !== "instructor") {
              return res.send({
                error: "unauthorized User",
              });
            }
            next();
          });
        } catch (error) {
          return res.send({
            error: "unauthorized User",
          });
        }
      },
      auth: async (req, res, next) => {
  try {
    const token = req.cookies.auth;

    if (token) {
      jwt.verify(token, config.jwt.secret, async (error, user) => {
        if (user) {
          const session = await sessionModel.getSessionByUserId(user.userId);

          if (session.response) {
            return res.json({
              error: "already signed in ",
            });
          }
        }
        next();
      });
    } else {
      next();
    }
  } catch (error) {
    return res.send({
      error: "unauthorized User",
    });
  }
},
admin: async (req, res, next) => {
  try {
    const token = req.cookies.auth;
    if (!token || token == undefined) {
      return res.send({
        error: "unauthorizedddd User",
      });
    }

    jwt.verify(token, config.jwt.secret, async (error, user) => {
      if (error) {
        return res.send({
          error: error,
        });
      }
        if (user.role !== "admin") {
        return res.send({
          error: "unauthorizeddd User",
        });
      }
      next();
    });
  } catch (error) {
    return res.send({
      error: "unauthorizedddd User",
    });
  }
},
logout: async (req, res, next) => {
  try {
    const token = req.cookies.auth;

    if (!token || token === undefined) {
      return res.json({ error: "Unauthorized User" });
    }

    jwt.verify(token, config.jwt.secret, async (error, user) => {
      if (error) {
        return res.json({ error: "Unauthorized User" });
      }

      // logout logic here to validate
      const deleteSession = await sessionModel.deleteSession(user.userId);

      if (deleteSession.error) {
        return res.json({ error: "Internal Server Error" });
      }

      // Clear client-side cookie
      res.clearCookie("auth");

      return res.json({ response: "Logout successful" });
    });
  } catch (error) {
    return res.json({ error: "Internal Server Error" });
  }
},
};
