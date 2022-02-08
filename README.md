# vpc-env-jsii-component

[![aws-cdk][badge-aws-cdk]][aws-cdk]
[![jsii][badge-jsii]][jsii]
[![npm-version][badge-npm-version]][npm-package]
[![nuget-version][badge-nuget-version]][nuget-package]
[![npm-downloads][badge-npm-downloads]][npm-package]
[![nuget-downloads][badge-nuget-downloads]][nuget-package]
[![license][badge-license]][license]

Component to create a VPC.

## How to use

Below are all languages supported by the AWS CDK.

### C#

Install the dependency:

```sh
dotnet add package StackSpot.Env.Vpc
```

Import the construct into your project, for example:

```csharp
using Amazon.CDK;
using Amazon.CDK.AWS.EC2;
using Constructs;
using StackSpot.Env.Vpc;

namespace MyStack
{
    public class MyStack : Stack
    {
        internal MyStack(Construct scope, string id, IStackProps props = null) : base(scope, id, props)
        {
            string[] subnetsIds = {
                "subnet-xxxxxxxxxxxxxxxxx",
                "subnet-xxxxxxxxxxxxxxxxx",
                "subnet-xxxxxxxxxxxxxxxxx"
            };

            VpcEnvComponent vpcEnvComponent = new VpcEnvComponent(this, "MyVpc", new VpcEnvComponentProps{
                SubnetsIds = subnetsIds,
                SubnetsType = SubnetType.PRIVATE_ISOLATED,
                VpcId = "vpc-xxxxxxxxxxxxxxxxx"
            });
        }
    }
}
```

### F#

Not yet supported.

### Go

Not yet supported.

### Java

Not yet supported.

### JavaScript

Install the dependency:

```sh
npm install --save @stackspot/cdk-env-vpc
```

Import the construct into your project, for example:

```javascript
const { Stack } = require('aws-cdk-lib');
const { SubnetType } = require('aws-cdk-lib/aws-ec2');
const { VpcEnvComponent } = require('@stackspot/cdk-env-vpc');

class MyStack extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    const vpcEnvComponent = new VpcEnvComponent(this, 'MyEcs', {
      subnetsIds: [
        'subnet-xxxxxxxxxxxxxxxxx',
        'subnet-xxxxxxxxxxxxxxxxx',
        'subnet-xxxxxxxxxxxxxxxxx',
      ],
      subnetsType: SubnetType.PRIVATE_ISOLATED,
      vpcId: 'vpc-xxxxxxxxxxxxxxxxx',
    });
  }
}

module.exports = { MyStack }
```

### Python

Not yet supported.

### TypeScript

Install the dependency:

```sh
npm install --save @stackspot/cdk-env-vpc
```

Import the construct into your project, for example:

```typescript
import { Stack, StackProps } from 'aws-cdk-lib';
import { SubnetType } from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';
import { VpcEnvComponent } from '@stackspot/cdk-env-vpc';

export class MyStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const vpcEnvComponent = new VpcEnvComponent(this, 'MyEcs', {
      subnetsIds: [
        'subnet-xxxxxxxxxxxxxxxxx',
        'subnet-xxxxxxxxxxxxxxxxx',
        'subnet-xxxxxxxxxxxxxxxxx',
      ],
      subnetsType: SubnetType.PRIVATE_ISOLATED,
      vpcId: 'vpc-xxxxxxxxxxxxxxxxx',
    });
  }
}
```

## Construct Props

### Using an existing VPC

| Name       | Type    | Description                           |
| ---------- | ------- | ------------------------------------- |
| vpcDefault | boolean | Whether to match the default VPC.     |
| vpcId      | string  | The identifier of the VPC to be used. |
| vpcRegion  | string  | Optional to override inferred region. |
| vpcName    | string  | The VPC name.                         |

### Creating a VPC

| Name                   | Type                                                    | Description                                                                            |
| ---------------------- | ------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| vpcCidr                | string                                                  | If don't inform the vpcId, a VPC with this CIDR will be created. Default: 10.0.0.0/16. |
| vpcMaxAzs              | number                                                  | Define the maximum number of AZs to be used. Default: 99.                              |
| vpcName                | string                                                  | The VPC name.                                                                          |
| vpcSubnetConfiguration | [SubnetConfiguration\[\]][aws-cdk-subnet-configuration] | Specify configuration parameters for a single subnet group in a VPC.                   |

### Subnets

| Name                     | Type                              | Description                                                                  |
| ------------------------ | --------------------------------- | ---------------------------------------------------------------------------- |
| subnetsAvailabilityZones | string[]                          | Select subnets only in the given AZs.                                        |
| subnetsGroupName         | string                            | Select the subnet group with the given name.                                 |
| subnetIds                | string[]                          | The identifiers of the subnets to be used.                                   |
| subnetsOnePerAz          | boolean                           | If true, return at most one subnet per AZ.                                   |
| subnetsType              | [SubnetType][aws-cdk-subnet-type] | Type of subnet to be used. Default: [SubnetType.PUBLIC][aws-cdk-subnet-type] |

## Properties

| Name    | Type                                        | Description              |
| ------- | ------------------------------------------- | ------------------------ |
| subnets | [SubnetSelection][aws-cdk-subnet-selection] | Subnets used on the VPC. |
| vpc     | [IVpc][aws-cdk-ivpc]                        | VPC to be used.          |

## Development

### Prerequisites

- [EditorConfig][editorconfig] (Optional)
- [Git][git]
- [Node.js 16][nodejs]

### Setup

```sh
cd vpc-env-jsii-component
npm install
```

You are done! Happy coding!

## IAM Policy

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Action": [
                "cloudformation:Describe*",
                "cloudformation:List*",
                "cloudformation:Get*"
            ],
            "Resource": "*",
            "Effect": "Allow"
        },
        {
            "Action": "s3:*",
            "Resource": "arn:aws:s3:::cdktoolkit-stagingbucket-*",
            "Effect": "Allow"
        },
        {
            "Action": [
                "ssm:GetParameters"
            ],
            "Resource": "*",
            "Effect": "Allow"
        },
        {
            "Effect": "Allow",
            "Action": [
                "ec2:CreateTags",
                "ec2:CreateVpc",
                "ec2:CreateSubnet",
                "ec2:CreateRouteTable",
                "ec2:CreateRoute",
                "ec2:CreateInternetGateway",
                "ec2:CreateNatGateway",
                "ec2:DescribeVpcs",
                "ec2:DescribeNatGateways",
                "ec2:DescribeAddresses",
                "ec2:DescribeSubnets",
                "ec2:DescribeRouteTables",
                "ec2:DescribeAvailabilityZones",
                "ec2:DescribeInternetGateways",
                "ec2:AttachInternetGateway",
                "ec2:allocateAddress",
                "ec2:AssociateRouteTable",
                "ec2:ModifyVpcAttribute",
                "ec2:ModifySubnetAttribute",
                "ec2:ReplaceRoute",
                "ec2:DeleteRoute",
                "ec2:DeleteVpc",
                "ec2:DeleteTags",
                "ec2:DeleteSubnet",
                "ec2:DeleteInternetGateway",
                "ec2:DeleteRouteTable",
                "ec2:DetachInternetGateway",
                "ec2:DeleteNatGateway",
                "ec2:releaseAddress",
                "ec2:DisassociateRouteTable"
            ],
            "Resource": "*"
        }
    ]
}
```

Usage:

```sh
cdk bootstrap \
  --public-access-block-configuration false \
  --trust <account-id> \
  --cloudformation-execution-policies arn:aws:iam::<account-id>:policy/<policy-name> \
  aws://<account-id>/<region>

cdk deploy
```

[aws-cdk]: https://aws.amazon.com/cdk
[aws-cdk-subnet-configuration]: https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_ec2.SubnetConfiguration.html
[aws-cdk-subnet-selection]: https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_ec2.SubnetSelection.html
[aws-cdk-subnet-type]: https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_ec2.SubnetType.html
[aws-cdk-ivpc]: https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_ec2.IVpc.html
[badge-aws-cdk]: https://img.shields.io/github/package-json/dependency-version/stack-spot/vpc-env-jsii-component/aws-cdk-lib
[badge-jsii]: https://img.shields.io/github/package-json/dependency-version/stack-spot/vpc-env-jsii-component/dev/jsii
[badge-license]: https://img.shields.io/github/license/stack-spot/vpc-env-jsii-component
[badge-npm-downloads]: https://img.shields.io/npm/dt/@stackspot/cdk-env-vpc?label=downloads%20%28npm%29
[badge-npm-version]: https://img.shields.io/npm/v/@stackspot/cdk-env-vpc
[badge-nuget-downloads]: https://img.shields.io/nuget/dt/StackSpot.Env.Vpc?label=downloads%20%28NuGet%29
[badge-nuget-version]: https://img.shields.io/nuget/vpre/StackSpot.Env.Vpc
[editorconfig]: https://editorconfig.org/
[git]: https://git-scm.com/downloads
[jsii]: https://aws.github.io/jsii/
[license]: https://github.com/stack-spot/vpc-env-jsii-component/blob/main/LICENSE
[nodejs]: https://nodejs.org/en/download/
[npm-package]: https://www.npmjs.com/package/@stackspot/cdk-env-vpc
[nuget-package]: https://www.nuget.org/packages/StackSpot.Env.Vpc
