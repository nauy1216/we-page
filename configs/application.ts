import 'reflect-metadata' // 配合typedi、routing-controllers使用
import Koa from 'koa'
import { Container } from 'typedi'
import { useDatabase, useRedis } from './customs'
import { routingConfigs } from './routing.options'
import { useMiddlewares } from './koa.middlewares'
import { useKoaServer, useContainer } from 'routing-controllers'
import { catchError } from 'configs/middlewares/exception'

// 使用数据库
if (useDatabase) {
  require('./connection')
}

// 使用redis
if (useRedis) {
  require('./redis')
}

const createKoaServer = async (): Promise<Koa> => {
  const koa: Koa = new Koa()
  koa.use(catchError)
  // 中间件
  useMiddlewares(koa)
  const app: Koa = useKoaServer<Koa>(koa, routingConfigs)

  useContainer(Container)

  return app
}

export default createKoaServer
