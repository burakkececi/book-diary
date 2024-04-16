import Sequelize from 'sequelize';
import 'dotenv/config'

// Models
import userModel from '../models/user.model.js';
import noteModel from '../models/note.model.js';

const sequelize = new Sequelize(
    process.env.PG_DB,
    process.env.PG_USER,
    process.env.PG_PASSWORD,
    {
        host: "0.0.0.0",/*process.env.PG_HOST,*/
        dialect: process.env.DIALECT,
        port: 5433
    }
);

const modelDefiners = [
    userModel,
    noteModel
];

// We define all models according to their files.
for (const modelDefiner of modelDefiners) {
    modelDefiner(sequelize);
}

// We execute any extra setup after the models are defined, such as adding associations.
function applyExtraSetup(sequelize) {
	const { User, Note } = sequelize.models;

	User.hasMany(Note);
	Note.belongsTo(User);
}

applyExtraSetup(sequelize);

// We export the sequelize connection instance to be used around our app.
export default sequelize;