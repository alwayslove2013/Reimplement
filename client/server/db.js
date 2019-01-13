const mongoose = require('mongoose')
const Schema = mongoose.Schema

// 定义数据Schema
const paperSchema = new Schema({
  id: String,
  year: Number,
  name: String,
  refs: Number,
  deg: Number,
  citeList: Array,
  refList: Array,
  cites: Number,
  authors: Array,
  tags: Array
})

const authorSchema = new Schema({
  id: String,
  fullname: String,
  name: String,
  count: Number,
  org: String,
  link: String,
  interests: String,
  cnt: Number,
  items: Array,
  authors: Array,
  tags: Array,
  cites: Number
})

const keywordSchema = new Schema({
  id: String,
  name: String,
  count: Number,
  items: Array,
  authors: Array,
  tags: Array
})

// 这句话用来干嘛....
mongoose.Promise = global.Promise

// 连一下数据库，看成功与否
mongoose.connect('mongodb://192.168.10.9:27017/PivotPaths')
mongoose.connection.on('error', function (error) {
  console.log('数据库test_nodeVue连接失败：' + error)
})
mongoose.connection.once('open', function () {
  console.log('数据库test_nodeVue连接成功')
  // 初始化数据库
  // initData();
})

// 用户信息

// 定义Model
const db = {
  paperModel: mongoose.model('papers', paperSchema),
  authorModel: mongoose.model('authors', authorSchema),
  tagModel: mongoose.model('tags', keywordSchema)
}

module.exports = db
