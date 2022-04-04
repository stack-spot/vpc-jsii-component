import { App, Stack } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { Vpc as AwsVpc } from 'aws-cdk-lib/aws-ec2';
import { Vpc } from '../lib/index';

describe('Vpc', () => {
  test('has vpc property', () => {
    const app = new App();
    const stack = new Stack(app, 'TestStack');
    const vpc = new Vpc(stack, 'TestConstruct', { vpcName: 'TestVpc' });

    expect(vpc.virtualPrivateCloud).toBeInstanceOf(AwsVpc);
  });

  test('creates VPC', () => {
    const app = new App();
    const stack = new Stack(app, 'TestStack');
    new Vpc(stack, 'TestConstruct', { vpcName: 'TestVpc' });
    const template = Template.fromStack(stack);

    template.hasResource('AWS::EC2::VPC', {});
  });

  test('creates VPC with default CIDR', () => {
    const app = new App();
    const stack = new Stack(app, 'TestStack');
    new Vpc(stack, 'TestConstruct', { vpcName: 'TestVpc' });
    const template = Template.fromStack(stack);

    template.hasResourceProperties('AWS::EC2::VPC', {
      CidrBlock: '10.0.0.0/16',
    });
  });

  test('creates VPC with CIDR from props', () => {
    const app = new App();
    const stack = new Stack(app, 'TestStack');
    new Vpc(stack, 'TestConstruct', {
      vpcCidr: '123.9.0.0/16',
      vpcName: 'TestVpc',
    });
    const template = Template.fromStack(stack);

    template.hasResourceProperties('AWS::EC2::VPC', {
      CidrBlock: '123.9.0.0/16',
    });
  });

  test('has only one VPC', () => {
    const app = new App();
    const stack = new Stack(app, 'TestStack');
    new Vpc(stack, 'TestConstruct', { vpcName: 'TestVpc' });
    const template = Template.fromStack(stack);

    template.resourceCountIs('AWS::EC2::VPC', 1);
  });
});
