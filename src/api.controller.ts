import { Controller, Get } from '@nestjs/common';
import { version } from '../package.json'

@Controller()
export class ApiController {

  @Get()
  getInfo(): any {
    return { version }
  }

}
