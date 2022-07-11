import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';
import Matches from './MatchModel';

class Teams extends Model {
  public id!: number;
  public teamName!: string;
}

Teams.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  teamName: {
    type: STRING(30),
    allowNull: false,
  },
}, {
  // ... Outras configs
  underscored: true,
  sequelize: db,
  modelName: 'teams',
  timestamps: false,
});

Teams.hasMany(Matches, { foreignKey: 'homeTeam', as: 'home_team' });
Teams.hasMany(Matches, { foreignKey: 'awayTeam', as: 'away_team' });

Matches.belongsTo(Teams, { foreignKey: 'homeTeam', as: 'home_team' });
Matches.belongsTo(Teams, { foreignKey: 'awayTeam', as: 'away_team' });

/**
  * `Workaround` para aplicar as associations em TS:
  * Associations 1:N devem ficar em uma das instâncias de modelo
  * */

// OtherModel.belongsTo(Example, { foreignKey: 'campoA', as: 'campoEstrangeiroA' });
// OtherModel.belongsTo(Example, { foreignKey: 'campoB', as: 'campoEstrangeiroB' });

// Example.hasMany(OtherModel, { foreignKey: 'campoC', as: 'campoEstrangeiroC' });
// Example.hasMany(OtherModel, { foreignKey: 'campoD', as: 'campoEstrangeiroD' });

export default Teams;
