module.exports = {
  pages: {
    index: {
      entry: 'src/views/index/index.js',
      template: 'public/index.html',
      title: 'Dunzo-Clone'
    },
    userLogin: {
      entry: 'src/views/user/login/login.js',
      template: 'public/index.html',
      title: 'login-DunzoClone'
    },
    orders: {
      entry: 'src/views/user/orders/orders.js',
      title: 'orders-DunzoClone'
    }
  }
}
