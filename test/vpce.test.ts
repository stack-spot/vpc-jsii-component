import { App, Stack } from 'aws-cdk-lib';
import { Vpc as AwsVpc, SubnetType, SecurityGroup } from 'aws-cdk-lib/aws-ec2';
import { Vpc } from '../lib/index';

describe('Vpce', () => {
  test('create api vpc endpoint', () => {
    const app = new App();
    const stack = new Stack(app, 'TestStackVpce');
    const vpc = new Vpc(stack, 'TestVpc', { vpcName: 'TestVpcForVpce' });

    Vpc.createApiVpcEndpoint(stack, vpc.virtualPrivateCloud, {
      stackName: 'TestApi',
      subnetType: SubnetType.PUBLIC,
      port: 443,
    });
  });
  test('create api vpc endpoint using existing security group', () => {
    const app = new App();
    const stack = new Stack(app, 'TestStackVpce');
    const vpcMock = new AwsVpc(stack, 'TestVpc', { vpcName: 'TestVpcForVpce' });
    const sg = new SecurityGroup(stack, 'TestSG', {
      vpc: vpcMock,
      allowAllOutbound: true,
      description: 'security group for testing',
    });

    Vpc.createApiVpcEndpoint(stack, vpcMock, {
      securityGroupId: sg.securityGroupId,
      stackName: 'TestApi',
      subnetType: SubnetType.PUBLIC,
      port: 443,
    });
  });
});
