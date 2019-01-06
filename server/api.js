const db = require('./db')

function sortFouction(a, b) {
  return b.cites - a.cites
}

module.exports = function(app) {
  app.all('*', function(req, res, next) {
    next()
  })
  app.get('/api/test', function(req, res) {
    res.json({
      text: 'connect!',
      name: 'Min Tian'
    })
  })
  app.get('/api/core_author', function (req, res) {
    let data = req.query
    db.authorModel.find({name: data.word}).sort({'cites': -1}).exec((err, doc) => {
      if (err) {
        console.log('DOI 查询失败' + err)
        res.json({code: 1, msg: '查询出错，未知原因'})
        return
      } else {
        if (!doc) {
          res.json({code: 2, msg: '查询不到，未知原因'})
          return
        } else {
          // console.log(doc.slice(0, 12))
          let tmp = doc[0].items // 获取一个author的全部items（id list），交由papermodel进行下一轮查询
          // console.log('results', tmp)
          db.paperModel.find({id: {$in: tmp}}).exec((err, doc) => {
            if (err) {
              console.log('DOI 查询失败' + err)
              res.json({code: 1, msg: '查询出错，未知原因'})
              return
            } else {
              if (!doc) {
                res.json({code: 2, msg: '查询不到，未知原因'})
                return
              } else {
                // console.log(doc.slice(0, 12))
                // res.json({code:3, msg: '查询成功', data: doc.slice(0, 12)})
                let results = []
                let tmp = doc
                for (let key in tmp) {
                  let item = doc[key]
                  let result = {
                    name: item.name,
                    cites: item.cites,
                    year: item.year,
                    authors: item.authors,
                    tags: item.tags,
                    refList: item.refList,
                    citeList: item.citeList
                  }
                  results.push(result)
                }
                // ToDo dictionary of author_id and tag_id
                // think about where to write
                res.json({code:3, msg: '查询成功', data: results})
              }
            }
          })
        }
      }
    })
  })
  app.get('/api/search_titles', function (req, res) {
    let data = req.query
    // console.log('req', data, data.word)
    // db.paperModel.findOne({year: {$lt: 2005}}, function(err, doc) {              {limit: 4},
    db.paperModel.find({name: {$regex: data.word, $options: '$i'}}).exec((err, doc) => {
      // db.paperModel.find({'title': 'ABC'}, function(err, doc) {
      if (err) {
        console.log('DOI 查询失败' + err)
        res.json({code: 1, msg: '查询出错，未知原因'})
        return
      } else {
        if (!doc) {
          res.json({code: 2, msg: '查询不到，未知原因'})
          return
        } else {
          // console.log(doc.slice(0, 12))
          // res.json({code:3, msg: '查询成功', data: doc.slice(0, 12)})
          let results = []
          let tmp = doc.slice(0, 4)
          for (let key in tmp) {
            let item = doc[key]
            let result = {
              name: item.name,
              cites: item.cites,
              year: item.year
            }
            results.push(result)
          }
          // results.sort(sortFouction)
          // console.log(results)
          res.json({code:3, msg: '查询成功', data: results})
        }
      }
    })
  })
  app.get('/api/search_authors', function (req, res) {
    let data = req.query
    // console.log('req', data, data.word)
    // db.paperModel.findOne({year: {$lt: 2005}}, function(err, doc) {              {limit: 4},
    db.authorModel.find({fullname: {$regex: data.word, $options: '$i'}}).sort({'cites': -1}).exec((err, doc) => {
      // db.paperModel.find({'title': 'ABC'}, function(err, doc) {
      if (err) {
        console.log('DOI 查询失败' + err)
        res.json({code: 1, msg: '查询出错，未知原因'})
        return
      } else {
        if (!doc) {
          res.json({code: 2, msg: '查询不到，未知原因'})
          return
        } else {
          // console.log(doc.slice(0, 12))
          // res.json({code:3, msg: '查询成功', data: doc.slice(0, 12)})
          let results = []
          let tmp = doc.slice(0, 4)
          for (let key in tmp) {
            let item = doc[key]
            let result = {
              name: item.fullname,
              cites: item.cites,
              count: item.count,
              org: item.org
            }
            results.push(result)
          }
          // results.sort(sortFouction)
          // console.log(results)
          res.json({code:3, msg: '查询成功', data: results})
        }
      }
    })
  })
  app.get('/api/search_tags', function (req, res) {
    let data = req.query
    // console.log('req', data, data.word)
    // db.paperModel.findOne({year: {$lt: 2005}}, function(err, doc) {              {limit: 4},
    db.tagModel.find({name: {$regex: data.word, $options: '$i'}}).sort({'count': -1}).exec((err, doc) => {
      // db.paperModel.find({'title': 'ABC'}, function(err, doc) {
      if (err) {
        console.log('DOI 查询失败' + err)
        res.json({code: 1, msg: '查询出错，未知原因'})
        return
      } else {
        if (!doc) {
          res.json({code: 2, msg: '查询不到，未知原因'})
          return
        } else {
          // console.log(doc.slice(0, 12))
          // res.json({code:3, msg: '查询成功', data: doc.slice(0, 12)})
          let results = []
          let tmp = doc.slice(0, 4)
          for (let key in tmp) {
            let item = doc[key]
            let result = {
              name: item.name,
              count: item.count
            }
            results.push(result)
          }
          // results.sort(sortFouction)
          // console.log(results)
          res.json({code:3, msg: '查询成功', data: results})
        }
      }
    })
  })
}
