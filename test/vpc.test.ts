import { App, Stack } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import {
  Vpc as AwsVpc,
  SubnetType as AwsSubnetType,
} from 'aws-cdk-lib/aws-ec2';
import { Vpc } from '../lib/index';

describe('Vpc', () => {
  test('has vpc property', () => {
    const app = new App();
    const stack = new Stack(app, 'TestStack');
    const vpc = new Vpc(stack, 'TestConstruct', { vpcName: 'TestVpc' });

    expect(vpc.virtualPrivateCloud).toBeInstanceOf(AwsVpc);
  });

  test('using existing non default vpc', () => {
    const app = new App();
    const stack = new Stack(app, 'TestStack', {
      env: { account: '012345678901', region: 'us-east-1' },
    });
    const vpc = new AwsVpc(stack, 'TestAwsVpc', { vpcName: 'TestVpc' });
    new Vpc(stack, 'TestVpc', {
      vpcId: Stack.of(stack).resolve(vpc.vpcId),
      vpcName: 'TestVpc',
      vpcDefault: false,
    });
    const template = Template.fromStack(stack);

    template.hasResourceProperties('AWS::EC2::VPC', {
      Tags: [{ Key: 'Name', Value: 'TestVpc' }],
    });
  });

  test('using existing default vpc', () => {
    const app = new App();
    const stack = new Stack(app, 'TestStack', {
      env: { account: '012345678901', region: 'us-east-1' },
    });
    const vpc = new AwsVpc(stack, 'TestAwsVpc', { vpcName: 'TestVpc' });
    new Vpc(stack, 'TestVpc', {
      vpcId: Stack.of(stack).resolve(vpc.vpcId),
      vpcName: 'TestVpc',
      vpcDefault: true,
    });
    const template = Template.fromStack(stack);

    template.hasResourceProperties('AWS::EC2::VPC', {
      Tags: [{ Key: 'Name', Value: 'TestVpc' }],
    });
  });

  test('using VPC with subnetIds from props', () => {
    const app = new App();
    const stack = new Stack(app, 'TestStack');
    const vpcMock = new AwsVpc(stack, 'TestVpc', {
      cidr: '124.9.0.0/16',
      natGateways: 0,
      maxAzs: 3,
      subnetConfiguration: [
        {
          name: 'public-subnet-1',
          subnetType: AwsSubnetType.PUBLIC,
          cidrMask: 24,
        },
      ],
    });

    new Vpc(stack, 'TestConstruct', {
      vpcName: 'TestVpc',
      subnetsIds: [vpcMock.publicSubnets[0].subnetId],
    });
    const template = Template.fromStack(stack);

    template.hasResourceProperties('AWS::EC2::VPC', {
      CidrBlock: '124.9.0.0/16',
    });
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

  test('creates VPC with non subnetonperaz from props', () => {
    const app = new App();
    const stack = new Stack(app, 'TestStack');
    new Vpc(stack, 'TestConstruct', {
      vpcCidr: '123.9.0.0/16',
      vpcName: 'TestVpc',
      subnetsOnePerAz: false,
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
