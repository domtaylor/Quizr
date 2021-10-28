const {Settings, ResultOption, Question, Stats} = require('../model/settings')

class SettingsControllers {

    //GET the settings
    async find(ctx) {
        try{
            console.log('Getting Settings')
            const {shop} = ctx.params

            if (shop) {
                await Settings
                .findOne({ shop })
                .populate('resultOptions')
                .populate({
                    path: 'questions',
                    populate: {
                        path: 'answers.negative',
                        model: 'ResultOption'
                    }
                })
                .populate({
                    path: 'questions',
                    populate: {
                    path: 'answers.positive',
                    model: 'ResultOption'
                    }
                }).then( async settings => { 

                    console.log('Found settings', settings)
                    await Stats
                    .findOne({ shop }).then(stats => { 
                        console.log('Found stats', stats)
                        ctx.body = {
                            settings,
                            stats
                        }
                    })
                })
            } else {
                ctx.body = {shop: null}
            }
        } catch (err) {
            console.log('Error', err)
        ctx.throw(422)
      }
    }

    //POST settings
    async save(ctx) {
        try {
            const data = ctx.request.body

            if (data._id) {
                console.log('Updating')
                const settings = await Settings.updateOne({_id: data._id}, data);
                ctx.body = settings
            } else {
                console.log('New record')
                const settings = await new Settings(data).save();
                ctx.body = settings
            }
        } catch (err) {
          ctx.throw(422)
        }
      }

    //Save result option
    async saveOption(ctx) {

        try {
            const data = ctx.request.body
            const option = data.option

            if (option._id) {
                console.log('Updating option')
                const resultOption = await ResultOption.updateOne({_id: option._id}, option);
                ctx.body = resultOption
            } else {
                console.log('New option')
                const resultOption = await new ResultOption(option).save(function(err, doc){
                    if (!err){
                        Settings.findOne({ _id: data.settings._id }, function (err, settings) {
                            console.log('Found the settings')
                            settings.resultOptions.push(doc)
                            settings.save()
                        })
                    }
                })
                ctx.body = resultOption
            }
        } catch (err) {
          ctx.throw(422);
        }
    }

    //Save Question
    async saveQuestion(ctx) {
        console.log('Saving Question')

        try {
            const data = ctx.request.body
            const question = data.question

            if (question._id) {
                console.log('Updating question')
                ctx.body = await Question.updateOne({_id: question._id}, question);
            } else {
                console.log('New question')
                await new Question(question).save(function(err, doc){
                    if (!err){
                        Settings.findOne({ _id: data.settings._id }, function (err, settings) {
                            console.log('Found the settings')
                            settings.questions.push(doc)
                            settings.save()
                        })
                        ctx.body = doc
                    }
                })
            }
        } catch (err) {
          ctx.throw(422);
        }
    }

    //Save Question
    async deleteQuestion(ctx) {
        console.log('Deleting Question')

        try {
            const data = ctx.request.body;

            if (data) {
                ctx.body = await Question.deleteOne({_id: data._id})
            } 
        } catch (err) {
          ctx.throw(422)
        }
    }
}

module.exports = new SettingsControllers()