(async () => {
  const yargs = require('yargs/yargs')
  const { hideBin } = require('yargs/helpers')
  const args = yargs(hideBin(process.argv)).argv

  const { debug, DEMO, env, visma } = args
  if (!env) {
    console.error('Missing argument "env". Set it to "PROD" or "TEST" !')
    process.exit(-1)
  } else if (env !== 'PROD' && env !== 'TEST') {
    console.error('Invalid argument "env". Set it to "PROD" or "TEST" !')
    process.exit(-1)
  }
  if (visma && visma !== 'ALL' && visma !== 'SELECTED') {
    console.error('Invalid argument "visma". Set it to "ALL" or "SELECTED" !')
    process.exit(-1)
  }
  const config = require('./config')(env, visma)

  const { logConfig, logger } = require('@vtfk/logger')
  const getVismaData = require('./lib/Visma/get-visma-data')
  const filterVismaData = require('./lib/Visma/filter-visma-data')
  const { getMytosData, updateMytosData } = require('./lib/Mytos/mytos-data')
  const generateMytosPayload = require('./lib/Mytos/generate-mytos-payload')
  const HTTPError = require('./lib/http-error')

  if (DEMO || debug) {
    logConfig({
      prefix: `${debug ? 'debug' : ''}${debug && DEMO ? ' - DEMO' : DEMO ? 'DEMO' : ''} - ${env}`
    })
  } else {
    logConfig({
      prefix: env
    })
  }

  try {
    logger('info', ['mytos-telenor', 'start'])
    const results = await Promise.all([getVismaData({ ...args, config }), getMytosData({ ...args, config })])
    const visma = results[0]
    const mytos = results[1]
    logger('info', ['mytos-telenor', 'visma', visma.length, 'mytos', mytos.length])

    const usersWithPhone = filterVismaData(visma, mytos)
    const mytosPayload = generateMytosPayload({ users: usersWithPhone, ...args })
    if (mytosPayload.length > 0) {
      if (!DEMO) await updateMytosData({ ...args, payload: mytosPayload, config })
      else logger('info', ['mytos-telenor', 'will not update Mytos in DEMO mode'])
    } else await logger('warn', ['mytos-telenor', 'no users to update'])
    await logger('info', ['mytos-telenor', 'finish'])
  } catch (error) {
    if (error instanceof HTTPError) await logger('error', ['mytos-telenor', 'HTTPError', error.stack])
    else await logger('error', ['mytos-telenor', 'error', error])
  }
})()
