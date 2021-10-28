const SettingsControllers = require('../controller/settings')
const ShopifyControllers = require('../controller/shopify')
const ProcessPayment = require('../controller/processPayment')

module.exports = function(router){
    router.get('/', ProcessPayment)

    router.get('/api/settings/:shop', SettingsControllers.find)
    router.put('/api/settings', SettingsControllers.save)

    //Result Options
    router.put('/api/settings/saveoption', SettingsControllers.saveOption)

    //Questions
    router.put('/api/settings/savequestion', SettingsControllers.saveQuestion)
    router.put('/api/settings/deletequestion', SettingsControllers.deleteQuestion)

    //Shopify
    router.get('/api/shopify/', ShopifyControllers.get)
    router.post('/api/shopify/', ShopifyControllers.post)

    return router

}