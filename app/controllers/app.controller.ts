import { Post, Get, JsonController, Body, QueryParam } from 'routing-controllers'
import { uuid } from 'app/helpers'
import { AppService, PageService } from 'app/services'
import { App } from 'app/entities'
import { Inject } from 'typedi'
import Exception from 'app/response/exception'

@JsonController('/app')
export class AppController {
  @Inject()
  appService: AppService

  @Inject()
  pageService: PageService

  @Post('/addOrUpdate')
  async add(@Body() app: App): Promise<any> {
    if (!app.id) {
      app.id = uuid()
      app.createTime = new Date()
    }
    const data = this.appService.add(app)
    return {
      code: 200,
      data,
      message: '操作成功',
    }
  }

  @Get('/list')
  async list(): Promise<any> {
    const data = await this.appService.list()
    return {
      code: 200,
      data,
      message: '操作成功',
    }
  }

  @Get('/delete')
  async delete(@QueryParam('id') id: string): Promise<any> {
    if (!id) {
      throw new Exception(400, 'id不能为空')
    }
    await this.appService.delete(id)
    return {
      code: 200,
      message: '操作成功',
    }
  }

  @Get('/getOne')
  async getOne(@QueryParam('appId') appId: string): Promise<any> {
    const app = await this.appService.getOne(appId)
    const pages = await this.pageService.list(appId)

    return {
      code: 200,
      data: {
        ...app,
        pages,
      },
      message: '操作成功',
    }
  }
}
