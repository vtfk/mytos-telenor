(async () => {
  require('./config')
  const { logConfig, logger } = require('@vtfk/logger')
  const yargs = require('yargs/yargs')
  const { hideBin } = require('yargs/helpers')
  const getVismaData = require('./lib/Visma/get-visma-data')
  const filterVismaData = require('./lib/Visma/filter-visma-data')
  const { getMytosData, updateMytosData } = require('./lib/Mytos/mytos-data')
  const generateMytosPayload = require('./lib/Mytos/generate-mytos-payload')
  const HTTPError = require('./lib/http-error')

  const args = yargs(hideBin(process.argv)).argv
  const { DEMO } = args
  if (DEMO) {
    logConfig({
      prefix: 'DEMO'
    })
  }

  try {
    logger('info', ['mytos-telenor', 'start'])
    const results = await Promise.all([getVismaData(args), getMytosData()])
    const visma = results[0]
    const mytos = results[1]
    logger('info', ['mytos-telenor', 'visma', visma.length, 'mytos', mytos.length])

    const usersWithPhone = filterVismaData(visma, mytos)
    const mytosPayload = generateMytosPayload(usersWithPhone)
    if (!DEMO) await updateMytosData(mytosPayload)
    else logger('info', ['mytos-telenor', 'will not update Mytos in DEMO mode'])
    await logger('info', ['mytos-telenor', 'finish'])
  } catch (error) {
    if (error instanceof HTTPError) await logger('error', ['mytos-telenor', 'HTTPError', error.stack])
    else await logger('error', ['mytos-telenor', 'error', error])
  }
})()
