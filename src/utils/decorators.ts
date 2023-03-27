import { logger } from '@/shared/logger'

type MeasureOptions = {
  async?: boolean
}

export function Measure({ async = false }: MeasureOptions) {
  return function (
    _target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value

    if (async) {
      descriptor.value = async function (...args: any[]) {
        const start = Date.now()
        const result = await originalMethod.apply(this, args)
        const end = Date.now()

        const total = end - start

        if (total <= 5_000) {
          logger.info(`Method "${propertyKey}" took ${end - start}ms`)
        } else {
          logger.warn(`Method "${propertyKey}" took ${end - start}ms`)
        }

        return result
      }
    } else {
      descriptor.value = function (...args: any[]) {
        const start = Date.now()
        const result = originalMethod.apply(this, args)
        const end = Date.now()

        const total = end - start

        if (total <= 5_000) {
          logger.info(`Method "${propertyKey}" took ${end - start}ms`)
        } else {
          logger.warn(`Method "${propertyKey}" took ${end - start}ms`)
        }

        return result
      }
    }

    return descriptor
  }
}
