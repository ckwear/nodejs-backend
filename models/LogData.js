module.exports =(sequelize, DataTypes) => {
    return sequelize.define('BwAnalogTable', {
        ProjNodeId: {
            type: DataTypes.INTEGER(11),
            primaryKey: true,
            get() {
                const rawValue = this.getDataValue(username);
                return rawValue ? rawValue.toUpperCase() : null;
            }
        },
        TagName: {
            type: DataTypes.STRING(32),
            primaryKey: true,
        },
        LogDate: {
            type: DataTypes.STRING(12),
            primaryKey: true,
        },
        LogTime: {
            type: DataTypes.STRING(12),
            primaryKey: true,
        },
        MaxValue: {
            type: DataTypes.DOUBLE,
            allowNull: true,
            defaultValue: null,
        },
        AvgValue: {
            type: DataTypes.DOUBLE,
            allowNull: true,
            defaultValue: null,
        },
        MinValue: {
            type: DataTypes.DOUBLE,
            allowNull: true,
            defaultValue: null,
        },
        LastValue: {
            type: DataTypes.DOUBLE,
            allowNull: true,
            defaultValue: null,
        },
        Alarm: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            defaultValue: null,
        }

    }, {
        timestamps: false,
        tableName: 'BwAnalogTable',
        freezeTableName: true,
    });
};