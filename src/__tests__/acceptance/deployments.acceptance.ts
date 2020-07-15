import {Client, expect} from '@loopback/testlab';
import nock from 'nock';
import {CamundaApplication} from '../..';
import {setupApplication} from './test-helper';

export function setupResponse() {
  const mockHttpResponse = [
    {
      links: [],
      id: '71758d42-c15d-11ea-a412-6a07151a0bbc',
      name: 'romany',
      source: 'Camunda Modeler',
      deploymentTime: '2020-07-08T21:56:06.784+0100',
      tenantId: null,
    },
  ];
  return mockHttpResponse;
}

describe('get-deployments', () => {
  let app: CamundaApplication;
  let client: Client;

  //Arrange
  before('setupApplication', async () => {
    ({app, client} = await setupApplication());
  });

  after(async () => {
    await app.stop();
  });

  const mockHttpResponse = setupResponse();

  //Act
  it('fetch deployments', async () => {
    const mockHttp = nock('http://localhost:8080')
      .get('/engine-rest/deployment')
      .reply(200, mockHttpResponse);

    //assert
    await client
      .get('/deployments')
      .send({})
      .expect(200)
      .expect(mockHttpResponse);

    expect(mockHttp.isDone()).to.be.true();
  });

  // Assert

  // end of describe
});
