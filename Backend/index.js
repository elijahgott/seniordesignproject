const app = require('./server')
const config = require('./utils/config')
const logger = require('./utils/logger')

app.listen(config.PORT || 8081, () => {
  logger.info(`Server running on port ${config.PORT || 8081}`)
})