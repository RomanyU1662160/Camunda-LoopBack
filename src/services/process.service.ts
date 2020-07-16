import {inject, Provider} from '@loopback/core';
import {getService} from '@loopback/service-proxy';
// import {ProcessDataSource} from '../datasources';

export interface Process {
  // this is where you define the Node.js methods that will be
  // mapped to REST/SOAP/gRPC operations as stated in the datasource
  // json file.
  startJourney(): Promise<ProcessResponse>;
}

export interface ProcessResponse {
  result: {
    links: [];
    id: string;
    definitionId: string;
    businessKey?: string;
    caseInstanceId?: string;
    ended: boolean;
    suspended: boolean;
    tenantId?: string;
  };
}

export class ProcessProvider implements Provider<Process> {
  constructor(
    // process must match the name property in the datasource json file
    @inject('datasources.process')
    protected dataSource: ProcessDataSource = new ProcessDataSource(),
  ) {}

  value(): Promise<Process> {
    return getService(this.dataSource);
  }
}
