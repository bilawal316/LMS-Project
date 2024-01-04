const userModel = require("../models/userModel");
const {v4: uuidv4}=require("uuid");
const bcrypt = require ("bcryptjs");


module.exports = {
  createUser: async (body) => {
    try {
        const userId = uuidv4();
        const isUser = await userModel.getUserByEmail(body.email);

        
        if (isUser.response || isUser.error) {
            return {
                error: "email already exists",
            }
        }

        delete body.confirmPassword;
        body.password = await bcrypt.hash(body.password, 10);
        const user = await userModel.createUser(body, userId);

        if (user.error) {
            return {
                error: user.error,
            }
        }
        delete user.response.dataValues.password;
        return {
            response: user.response,
        }


    }

    catch (error) {
        return {
            error: error,
        };
    }
},getAllUsers: async (query) => {
  try {
      const offset = (query.pageNo - 1) * query.limit;
      console.log(offset)
      const users = await userModel.getAllUsers(offset, query);
      if (users.error) {
          return {
              error: users.error,
          }
      } return {
          response: users.response,
      };


  } catch (error) {
      return {
          error: error,
      };
  }

},
getAllRequests: async (query) => {
  try {
      const users = await userModel.getAllRequests(query);
console.log("service===",users)

      if (users.error) {
          return {
              error: users.error,
          }
      } return {
          response: users.response,
      };

  } catch (error) {
      return {
          error: error,
      };
  }

},
  deleteUser: async (query) => {
  try {
    const user = await userModel.deleteUser(query);
    if (user.error){
      return{
        error: user.error
      };
      }
      return{
        response:user.response
      }
    
  } catch (error) {
    return{
      error: error,
    }
  }
  },
  updateUser: async (body) => {
    try {
      const isUser = await userModel.getUserByUserId(body.userId);
      if(!isUser.response || isUser.error){
        return{
          error: "user does not exists"
        }
      }
      const user = await userModel.updateUser(body);
      if (user.error) {
        return {
            error: user.error,
        }
    }
    return {
        response: user.response,
    }
      
    } catch (error) {
      return {
        error:error,
      };
    }
  },
  onBoarding: async (body) => {
    try {
      const user = await userModel.onBoarding(body.userId, body.instructorId);
      if (!user.response || user.error) {
        return {
          error: "user does not exist",
        };
      }

      return {
        response: user.response,
      };
    } catch (error) {
      return {
        error: error,
      };
    }
  },
  getAllInstructor: async () => {
    try {
      const users = await userModel.getAllInstructor();
      if (users.error) {
        return {
          error: users.error,
        };
      }

      return {
        response: users.response,
      };
    } catch (error) {
      console.log(error)

      return {
        error: error,
      };
    }
  },
  getUserByUserId: async (query) => {
    try {
      const users = await userModel.getUserByUserId(query.userId);
      if (users.error) {
        return {
          error: users.error,
        };
      }

      return {
        response: users.response,
      };
    } catch (error) {
      console.log(error)

      return {
        error: error,
      };
    }
  },
  getTotalTrainees: async () => {
    try {
      const users = await userModel.getTotalTrainees();
      if (users.error) {
        return {
          error: users.error,
        };
      }

      return {
        response: users.response,
      };
    } catch (error) {
      console.log(error)

      return {
        error: error,
      };
    }
  },
}