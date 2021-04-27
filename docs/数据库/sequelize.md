# [Sequelize Unknown column '*.createdAt' in 'field list'](https://stackoverflow.com/questions/20386402/sequelize-unknown-column-createdat-in-field-list)

I'm getting a Unknown column 'userDetails.createdAt' in 'field list' When trying to fetch with association.

Using `findAll` without association works fine.

My code is as follows:

```js
var userDetails = sequelize.define('userDetails', {
    userId :Sequelize.INTEGER,
    firstName : Sequelize.STRING,
    lastName : Sequelize.STRING,
    birthday : Sequelize.DATE
});

var user = sequelize.define('user', {
    email: Sequelize.STRING,
    password: Sequelize.STRING
});

user.hasOne(userDetails, {foreignKey: 'userId'});

user.findAll({include: [userDetails] }).success(function(user) {
    console.log(user)
});
```



## answer

I think the error is that you have timestamps enabled in sequelize, but your actual table definitions in the DB do not contain a timestamp column.

When you do user.find it will just do `SELECT user.*`, which only takes the columns you actually have. But when you join, each column of the joined table will be aliased, which creates the following query:

```js
SELECT `users`.*, `userDetails`.`userId` AS `userDetails.userId`,`userDetails`.`firstName` AS `userDetails.firstName`,`userDetails`.`lastName` AS `userDetails.lastName`, `userDetails`.`birthday` AS `userDetails.birthday`, `userDetails`.`id` AS `userDetails.id`, `userDetails`.`createdAt` AS `userDetails.createdAt`, `userDetails`.`updatedAt` AS `userDetails.updatedAt` FROM `users` LEFT OUTER JOIN `userDetails` AS `userDetails` ON `users`.`id` = `userDetails`.`userId`;
```

The fix would be to disable timestamps for either the userDetails model:

```js
var userDetails = sequelize.define('userDetails', {
    userId :Sequelize.INTEGER,
    firstName : Sequelize.STRING,
    lastName : Sequelize.STRING,
    birthday : Sequelize.DATE
}, {
    timestamps: false
});
```

or for all models:

```js
var sequelize = new Sequelize('sequelize_test', 'root', null, {
    host: "127.0.0.1",
    dialect: 'mysql',
    define: {
        timestamps: false
    }
});
```