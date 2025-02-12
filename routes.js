const routes = require('next-routes')

module.exports = routes()
    .add('index')
    .add('questions', '/questions')
    .add('question', '/questions/:slug')
    .add('options', '/options')
    .add('option', '/options/:slug')
    .add('coupons', '/coupons')
    .add('preview', '/preview')
