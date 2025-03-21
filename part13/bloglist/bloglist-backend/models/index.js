const Blog = require('./blog')
const User = require('./user')
const Readinglist = require('./readinglist')
const UserSession = require('./user_session')

User.hasMany(Blog)
Blog.belongsTo(User)

User.belongsToMany(Blog, { through: Readinglist, as: 'readings' })
Blog.belongsToMany(User, { through: Readinglist, as: 'readers' })

module.exports = {
  Blog, User, Readinglist, UserSession
}