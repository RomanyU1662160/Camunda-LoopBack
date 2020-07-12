// Uncomment these imports to begin using these cool features!

import {inject} from '@loopback/core';
import {get, param} from '@loopback/rest';
import {Deployment, DeploymentResponse} from '../services/deployments.service';

export class DeploymentController {
  constructor(
    @inject('datasources.deployments')
    protected deployment: Deployment,
  ) {}

  @get('/deployments')
  async getDeployments(): Promise<DeploymentResponse> {
    return this.deployment.getDeployments();
  }

  @get('/deployment/{id}')
  async getDeployment(
    @param.path.string('id') id: string,
  ): Promise<DeploymentResponse> {
    return this.deployment.getDeployment(id);
  }
}
