import pino from 'pino'
import 'pino-pretty'

export const logger = pino({
  transport: {
    target: 'pino-pretty',
  },
})
