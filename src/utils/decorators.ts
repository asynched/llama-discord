type MeasureOptions = {
  async?: boolean
}

export function Measure({ async = false }: MeasureOptions) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value

    if (async) {
      descriptor.value = async function (...args: any[]) {
        const start = Date.now()
        const result = originalMethod.apply(this, args)
        const end = Date.now()

        console.log(`Method ${propertyKey} took ${end - start}ms`)

        return result
      }
    } else {
      descriptor.value = function (...args: any[]) {
        const start = Date.now()
        const result = originalMethod.apply(this, args)
        const end = Date.now()

        console.log(`Method ${propertyKey} took ${end - start}ms`)

        return result
      }
    }

    return descriptor
  }
}
