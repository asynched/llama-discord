import { resolve } from 'node:path'
import { addAlias } from 'module-alias'
import 'dotenv/config'

addAlias('@', resolve(__dirname))

require('@/main')
