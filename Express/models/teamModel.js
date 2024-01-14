
const { models } = require("./index");
const { Op } = require("sequelize");

module.exports = {
    createTeam: async (body, teamsId) => {
        try {
            const teams = await models.Team.create({
                teamsId,
                ...body
            })
            return {
                response: teams,
            };


        } catch (error) {
            return {
                error: error,
            };
        }

    },
    
    getTeamById: async (teamLeader, projectId) => {
        try {
            // Fetch user details from the Users table
            console.log("teamLeader", teamLeader)
            const user = await models.Users.findOne({
                where: {
                    userId: teamLeader  // Assuming teamLeaderId corresponds to id in the Users table
                },
                attributes: ['firstName', 'lastName']  // Specify the attributes you want from the Users table
            });

            // Fetch project details from the Projects table
            const project = await models.Projects.findOne({
                where: {
                    projectId: projectId
                },
                attributes: ['title']  // Specify the attributes you want from the Projects table
            });

console.log("check",user,project)
            return {
                response: {
                    userName: user ? user.firstName + " " + user.lastName : null,
                    projectTitle: project ? project.title : null
                }
            };

        } catch (error) {
            return {
                error: error,
            };
        }
    }
    ,
    getUserByEmail: async (userId) => {
        try {
            const user = await models.Users.findOne({
                where: {
                    userId: userId,
                }
            })
            return {
                response: user,
            };


        } catch (error) {
            return {
                error: error,
            };
        }

    },
    
    getAllTeams: async (query) => {
        try {
            console.log("model", query)
            const teams = await models.Team.findAll({
                // attributes : ["firstName", "lastName", "role", "email"]
                attributes: {
                    exclude: ["createdAt", "updatedAt", "deletedAt"],
                },
                where: {
                    instructorId: query
                }
            })
            console.log("check", teams)
            return {
                response: teams,
            };


        } catch (error) {
            return {
                error: error,
            };
        }
    },
    deleteUser: async (userId) => {
        try {
            const user = await models.Users.destroy({
                where: {
                    userId: userId,
                }
            })
            return {
                response: user,
            };


        } catch (error) {
            return {
                error: error,
            };
        }

    },
    updateTeam: async (body) => {
        try {
            const teams = await models.Team.update({
                ...body
            }, {
                where: {

                    teamsId: body.teamsId,
                }
            })
            return {
                response: teams,
            };


        } catch (error) {
            console.log("error", error);
            return {
                error: error,
            };
        }

    },



    getAllRequests: async (query) => {
        try {
            const user = await models.Users.findAll({
                where: [
                    {
                        instrucorId: query.instrucorId
                    },
                    {
                        isRequested: true,
                        isApproved: false,
                        isBlocked: false
                    },
                ]
                
            });
            return {
                response: user,
            };
        } catch (error) {
            return {
                error: error,
            };
        }
    },

    getTotalTeams: async (query) => {
        console.log("check1", query)
        try {
          const teams = await models.Team.findAll({
              where: {
                instructorId: query,
              },
            attributes: {
              exclude: ["password", "createdAt", "updatedAt", "deletedAt"],
            },
          });
          console.log(teams)
          const totalTeams = teams.length;
      
          return {
            response: {
                totalTeams: totalTeams,
              teamsList: teams,
            },
          };
      
        } catch (error) {
          return {
            error: error,
          };
        }
      },
      createTeamMembers: async (body, teamsMemberId) => {
        try {
            const teamsMember = await models.TeamMembers.create({
                teamsMemberId,
                ...body
            })
            return {
                response: teamsMember,
            };
        } catch (error) {
            return {
                error: error,
            };
        }
    },

    getTeamMemberById: async (teamsMemberId) => {
        try {
            const teamsMember = await models.Team.findOne({
                where: {
                    teamsMemberId: teamsMemberId,
                }
            })
            return {
                response: teamsMember,
            };
        } catch (error) {
            return {
                error: error,
            };
        }

    },

    getAllMembers: async (query) => {
        try {
            // Step 1: Fetch all trainees from the Users table
            const trainees = await models.Users.findAll({
                where: {
                    role: 'trainee',
                    isBlocked: 'false',
                    isApproved: 'true',
                    instructorId: query.instructorId
                },
                attributes: {
                    exclude: ["createdAt", "updatedAt", "deletedAt"],
                }
            });

            // Step 2: Extract all userIds from the trainees
            const userIds = [];
            for (let i = 0; i < trainees.length; i++) {
                userIds.push(trainees[i].userId);
            }

            // Step 3: Fetch all userIds from the teamMembers table
            const teamMembers = await models.TeamMembers.findAll({
                where: {
                    UserId: userIds
                },
                attributes: ['UserId']
            });

            // Step 4: Extract all userIds from the teamMembers
            const teamMemberUserIds = [];
            for (let i = 0; i < teamMembers.length; i++) {
                teamMemberUserIds.push(teamMembers[i].userId);
            }

            // Step 5: Filter out the trainees whose userId exists in the teamMemberUserIds
            const filteredTrainees = [];
            for (let i = 0; i < trainees.length; i++) {
                if (!teamMemberUserIds.includes(trainees[i].userId)) {
                    filteredTrainees.push(trainees[i]);
                }
            }

            return {
                response: filteredTrainees,
            };

        } catch (error) {
            return {
                error: error,
            };
        }
    },


    updateTeamsMember: async (body) => {
        try {
            const teamsMember = await models.TeamMembers.update({
                ...body
            }, {
                where: {

                    teamsId: body.teamsMemberId,
                }
            })
            return {
                response: teamsMember,
            };
        } catch (error) {
            return {
                error: error,
            };
        }

    },
};