import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'deployments',
  connector: 'rest',
  baseURL: 'http://localhost:8080/engine-rest',
  crud: false,
  options: {
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
    },
  },
  operations: [
    {
      template: {
        method: 'GET',
        url: 'http://localhost:8080/engine-rest/deployment/{id}',
      },
      functions: {
        getDeployment: ['id'],
      },
    },
    {
      template: {
        method: 'GET',
        url: 'http://localhost:8080/engine-rest/deployment',
      },
      functions: {
        getDeployments: [],
      },
    },
  ],
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class DeploymentsDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'deployments';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.deployments', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
