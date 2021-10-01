const Mock = require('mockjs')
// const chokidar = require('chokidar')
// const path = require('path')

// const mockPath = path.join(process.cwd(), 'mock')

module.exports = function(app) {
  app.get('/api/user/list', function(req, res) {
    res.json(Mock.mock({
      status: 200,
      message: '请求成功',
      result: Mock.mock({
        'list|10': [{
          name: '@cname',
          date: '@datetime',
        }],
      }),
    }))
  })
  app.get('/api/user/info', function(req, res) {
    res.json(Mock.mock({
      status: 200,
      message: '请求成功',
      result: Mock.mock({
        'list|10': [{
          date: '@datetime',
        }],
      }),
    }))
  })

  // chokidar.watch(mockPath).on('all', (event, path) => {
  //   if (event === 'change' || event === 'add') {
  //     console.log('修改文件了')
  //   }
  // })
}
