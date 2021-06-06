import 'module-alias/register'
import { Config } from '@/main/config/environment'
import { typeOrmSetup } from '@/main/config/typeorm'
import { seedSetup } from '@/main/config/seeds'

typeOrmSetup().then(async () => {
  await seedSetup()
  const app = (await import('@/main/config/express/app')).default
  app.listen(Config.port, () => {
    console.log(`Server started on port ${Config.port}`)
  })
}).catch(error => {
  console.error(error)
})
