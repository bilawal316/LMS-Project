const teamModel = require("../models/teamModel");
const { v4: uuidv4 } = require("uuid");



module.exports = {
    createTeam: async (body) => {
        try {
            const teamsId = uuidv4();
            const team = await teamModel.createTeam(body, teamsId);

            if (team.error) {
                return {
                    error: team.error,
                }
            }
            return {
                response: team.response,
            }

        }
        catch (error) {
            return {
                error: error,
            };
        }
    },
    
    createTeamMembers: async (body) => {
        try {
            const teamsMemberId = uuidv4();
            const teamMembers = await teamModel.createTeamMembers(body, teamsMemberId);

            if (teamMembers.error) {
                return {
                    error: teamMembers.error,
                }
            }
            return {
                response: teamMembers.response,
            }
        }
        catch (error) {
            return {
                error: error,
            };
        }
    },
    getAllTeams: async (query) => {
        try {
            const teams = await teamModel.getAllTeams(query.instructorId);

            if (teams.error) {
                return {
                    error: teams.error,
                }
            }

            const teamResponses = [];
console.log("length",teams.response.length)
            for (let i = 0; i < teams.response.length; i++) {
                console.log("response team",teams.response[i].team)
                const teamLeader = teams.response[i].dataValues.teamsLeaderId;
                const projectId = teams.response[i].dataValues.projectId;
                const teamTitle = teams.response[i].dataValues.title;
                const teamsId = teams.response[i].dataValues.teamsId;

console.log("service leader",teamLeader)
                const isTeam = await teamModel.getTeamById(teamLeader, projectId);
// console.log("isTeam",isTeam.response)
                if (!isTeam.response || isTeam.error) {
                    continue; // Skip this team and move to the next one
                }

                // Extract the required information from the response
                const teamInfo = {
                   leaderName: isTeam.response.userName, // Assuming 'name' is the property name in the response
                    projectTitle: isTeam.response.projectTitle ,
                    title:teamTitle,
                    teamId:teamsId// Assuming 'projectName' is the property name in the response
                };

                teamResponses.push(teamInfo);
            }

            return {
                response: teamResponses,
            };

        } catch (error) {
            return {
                error: error,
            };
        }
    },
    deleteUser: async (query) => {
        try {
            const user = await userModel.deleteUser(query.userId);
            if (user.error) {
                return {
                    error: user.error,
                }
            }
            return {
                response: user.response,
            }
        }
        catch (error) {
            return {
                error: error,
            };
        }
    },
    updateTeam: async (body) => {
        try {
            const isTeam = await teamModel.getTeamById(body.teamsId);
            if (!isTeam.response || isTeam.error) {
                return {
                    error: "Team does not exist",
                }
            }

            const teams = await teamModel.updateTeam(body);
            if (teams.error) {
                return {
                    error: teams.error,
                }
            }
            return {
                response: teams.response,
            }
        }
        catch (error) {
            return {
                error: error,
            };
        }
    },

    getAllRequests: async () => {
        try {
            const user = await teamModel.getAllRequests(query);
            if (!user.response || user.error) {
                return {
                    error: "request does not exist",
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
    getTotalTeams: async (query) => {
        try {
          const teams = await teamModel.getTotalTeams(query.instructorId);
          if (teams.error) {
            return {
              error: teams.error,
            };
          }
    
          return {
            response: teams.response,
          };
        } catch (error) {
          console.log(error)
    
          return {
            error: error,
          };
        }
      },
      createTeamMembers: async (body) => {
        try {
            const teamsMemberId = uuidv4();
            const teamMembers = await teamModel.createTeamMembers(body, teamsMemberId);

            if (teamMembers.error) {
                return {
                    error: teamMembers.error,
                }
            }
            return {
                response: teamMembers.response,
            }
        }
        catch (error) {
            return {
                error: error,
            };
        }
    },
    getAllMembers: async (query) => {
        try {

            const teamMembers = await teamModel.getAllMembers(query);

            if (teamMembers.error) {
                return {
                    error: teamMembers.error,
                }

            } return {
                response: teamMembers.response,
            };


        } catch (error) {
            return {
                error: error,
            };
        }

    },

    updateTeamsMember: async (body) => {
        try {
            const isTeamsMember = await teamModel.getTeamMemberById(body.teamsMemberId);
            console.log("isUser", isTeamsMember)
            if (isTeamsMember.response || isTeamsMember.error) {
                return {
                    error: "Team Member does not exist",
                }
            }


            const teamsMember = await projectModel.updateTeam(body);
            if (teamsMember.error) {
                return {
                    error: teamsMember.error,
                }
            }
            return {
                response: teamsMember.response,
            }
        }
        catch (error) {
            return {
                error: error,
            };
        }
    },
};