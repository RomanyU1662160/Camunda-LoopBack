import {inject, Provider} from '@loopback/core';
import {getService} from '@loopback/service-proxy';
import {DeploymentsDataSource} from '../datasources';

export interface Deployment {
  // this is where you define the Node.js methods that will be
  // mapped to REST/SOAP/gRPC operations as stated in the datasource
  // json file.
  getDeployments(): Promise<DeploymentResponse>;
  getDeployment(id: string): Promise<DeploymentResponse>;
}

export interface DeploymentResponse {
  result: {
    links?: [];
    id: string;
    name: string;
    source: string;
    deploymentTime: string;
    tenantId?: string;
  };
}

export class DeploymentsProvider implements Provider<Deployment> {
  constructor(
    // deployments must match the name property in the datasource json file
    @inject('datasources.deployments')
    protected dataSource: DeploymentsDataSource = new DeploymentsDataSource(),
  ) {}

  value(): Promise<Deployment> {
    return getService(this.dataSource);
  }
}
