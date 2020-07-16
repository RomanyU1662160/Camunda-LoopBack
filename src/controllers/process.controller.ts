import {inject} from '@loopback/core';
import {post} from '@loopback/rest';
import {Process, ProcessResponse} from '../services/process.service';

export class ProcessController {
  constructor(@inject('datasources.process') protected process: Process) {}

  @post('/start-journey')
  async startJourney(): // @requestBody() payload: JSONObject,
  //@param.path.string('definitionKey') definitionKey: string,
  Promise<ProcessResponse> {
    return this.process.startJourney();
  }
}
