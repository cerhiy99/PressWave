const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const Categories=sequelize.define("categories",{
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name1:{type:DataTypes.STRING,allowNull:false},
    name2:{type:DataTypes.STRING,allowNull:false},
    name3:{type:DataTypes.STRING,allowNull:false}
});

const Hashtag=sequelize.define("hesteg",{
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name1:{type:DataTypes.STRING,allowNull:false},
    name2:{type:DataTypes.STRING,allowNull:false},
    name3:{type:DataTypes.STRING,allowNull:false}
});
const Article = sequelize.define("article", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name1: { type: DataTypes.STRING, allowNull: false },
    name2: { type: DataTypes.STRING, allowNull: false },
    name3: { type: DataTypes.STRING, allowNull: false },
    date: { type: DataTypes.DATE, allowNull: false },
    image: { type: DataTypes.STRING },
    description1: { type: DataTypes.TEXT, allowNull: false },
    description2: { type: DataTypes.TEXT, allowNull: false },
    description3: { type: DataTypes.TEXT, allowNull: false },
    countWatch: { type: DataTypes.INTEGER, allowNull: true },
    isImage: { type: DataTypes.BOOLEAN, defaultValue: true },
    video: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
    time: { type: DataTypes.STRING, allowNull: true },
    timeReading: { type: DataTypes.STRING, allowNull: true },
    isHot: { type: DataTypes.BOOLEAN, defaultValue: false },
    isHotMain: { type: DataTypes.BOOLEAN, defaultValue: false }
});

const HashtagArticles=sequelize.define("hastagArticles",{
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const CategoriesArticles=sequelize.define("categorisArticles",{
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

Hashtag.hasMany(HashtagArticles);
HashtagArticles.belongsTo(Hashtag);

Categories.hasMany(CategoriesArticles);
CategoriesArticles.belongsTo(Categories);


Article.hasMany(CategoriesArticles);
CategoriesArticles.belongsTo(Article);

Article.hasMany(HashtagArticles);
HashtagArticles.belongsTo(Article);

module.exports={Categories,Article,Hashtag,CategoriesArticles,HashtagArticles}