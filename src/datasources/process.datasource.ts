import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

//const camundaBaseUrl = 'http://localhost:8080/engine-rest';
//const definitionKey = 'romany_test';

const config = {
  name: 'process',
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
        method: 'POST',
        url:
          'http://localhost:8080/engine-rest/process-definition/key/romany_test/start',
      },
      functions: {
        startJourney: [],
      },
    },
  ],
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class ProcessDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'process';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.process', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
