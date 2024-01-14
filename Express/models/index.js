const sequelize = require ("../bin/dbConnection");
const Users = require("./definations/users");
const Team = require("./definations/team");
const Projects = require("./definations/projects");
const Tasks = require("./definations/tasks");
const TeamMembers = require("./definations/teamMembers");
const Sessions = require("./definations/sessions")


const models = { 
    Users, Team, Projects, Tasks , TeamMembers, Sessions
};

//relations

//team-projects one-to-one 
Team.hasOne(Projects , {foreignKey: "TeamId"});
Projects.belongsTo(Team, {foreignKey: "TeamId"});

//users-sessions one-to-one 
Users.hasOne(Sessions , {foreignKey: "userId"});
Sessions.belongsTo(Users, {foreignKey: "userId"});

//projects-task one-to-many
Projects.hasMany(Tasks , {foreignKey: "ProjectId"});
Tasks.belongsTo(Projects, {foreignKey: "ProjectId"});

//TeamMember-task one-to-many
TeamMembers.hasMany(Tasks , {foreignKey: "TasksId"});
Tasks.belongsTo(TeamMembers, {foreignKey: "TasksId"});

//User-TeamMember one-to-many
Users.hasMany(TeamMembers, { foreignKey: "UserId" });
TeamMembers.belongsTo(Users, { foreignKey: "UserId" });

//TeamMember-teams one-to-many
Team.hasMany(TeamMembers , {foreignKey: "TeamsId"});
TeamMembers.belongsTo(Team, {foreignKey: "TeamsId"});

//users-teams one-to-many (user as a instructor)
Users.hasMany(Team, {foreignKey: "instructorId"});
Team.belongsTo(Users, {foreignKey: "instructorId"})

//Project-teams one-to-many
Projects.hasMany(Team, {foreignKey: "projectId"});
Team.belongsTo(Projects, {foreignKey: "projectId"})

Users.hasMany(Users,{foreignKey:"instructorId",useJunctionTable:false});

const db= {};

db.sequelize= sequelize;
sequelize.models = models;

module.exports = {models, db};