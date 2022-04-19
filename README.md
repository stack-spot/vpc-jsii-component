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
dotnet add package StackSpot.Cdk.Vpc
```

Import the construct into your project, for example:

```csharp
using Amazon.CDK;
using Constructs;
using StackSpot.Cdk.Vpc;

namespace MyStack
{
    public class MyStack : Stack
    {
        internal MyStack(Construct scope, string id, IStackProps props = null) : base(scope, id, props)
        {
            Vpc vpc = new Vpc(this, "MyVpc", new VpcProps {
                VpcName = "MyVpc"
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
npm install --save @stackspot/cdk-vpc
```

Import the construct into your project, for example:

```javascript
const { Stack } = require('aws-cdk-lib');
const { Vpc } = require('@stackspot/cdk-vpc');

class MyStack extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    const vpc = new Vpc(this, 'MyVpc', { vpcName: 'MyVpc' });
  }
}

module.exports = { MyStack };
```

### Python

Not yet supported.

### TypeScript

Install the dependency:

```sh
npm install --save @stackspot/cdk-vpc
```

Import the construct into your project, for example:

```typescript
import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Vpc } from '@stackspot/cdk-vpc';

export class MyStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const vpc = new Vpc(this, 'MyVpc', { vpcName: 'MyVpc' });
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

| Name                   | Type                                                        | Description                                                                            |
| ---------------------- | ----------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| vpcCidr                | string                                                      | If don't inform the vpcId, a VPC with this CIDR will be created. Default: 10.0.0.0/16. |
| vpcMaxAzs              | number                                                      | Define the maximum number of AZs to be used. Default: 99.                              |
| vpcName                | string                                                      | The VPC name.                                                                          |
| vpcSubnetConfiguration | [SubnetConfiguration\[\]][aws-cdk-ec2-subnet-configuration] | Specify configuration parameters for a single subnet group in a VPC.                   |

### Subnets

| Name                     | Type                                  | Description                                                                      |
| ------------------------ | ------------------------------------- | -------------------------------------------------------------------------------- |
| subnetsAvailabilityZones | string[]                              | Select subnets only in the given AZs.                                            |
| subnetsGroupName         | string                                | Select the subnet group with the given name.                                     |
| subnetIds                | string[]                              | The identifiers of the subnets to be used.                                       |
| subnetsOnePerAz          | boolean                               | If true, return at most one subnet per AZ.                                       |
| subnetsType              | [SubnetType][aws-cdk-ec2-subnet-type] | Type of subnet to be used. Default: [SubnetType.PUBLIC][aws-cdk-ec2-subnet-type] |

## Another Props

### ApiVpcEndpointCreateProps

| Name            | Type                                  | Description                                                              |
| --------------- | ------------------------------------- | ------------------------------------------------------------------------ |
| stackName       | string                                | The name of the Stack                                                    |
| securityGroupId | string                                | The identifier of the security id to be used on VPC Endpoint. (Optional) |
| subnetType      | [SubnetType][aws-cdk-ec2-subnet-type] | The type of subnet to use.                                               |
| port            | number                                | The port to be used by service linked to VPC Endpoint                    |
| vpc             | [IVpc][aws-cdk-ec2-ivpc]              | The VPC to use.                                                          |

## Properties

| Name                | Type                                            | Description              |
| ------------------- | ----------------------------------------------- | ------------------------ |
| subnets             | [SubnetSelection][aws-cdk-ec2-subnet-selection] | Subnets used on the VPC. |
| virtualPrivateCloud | [IVpc][aws-cdk-ec2-ivpc]                        | VPC to be used.          |

## Methods

| Name                                      | Description            |
| ----------------------------------------- | ---------------------- |
| static createApiVpcEndpoint(scope, props) | Create a VPC Endpoint. |

### createApiVpcEndpoint(scope, vpc, props)

```typescript
public static createApiVpcEndpoint(scope: Construct,vpc: IVpc,props: ApiVpcEndpointCreateProps)
```

_Parameters_

- **scope** [Construct][aws-cdk-construct]
- **vpc** [IVpc][aws-cdk-ec2-ivpc]
- **props** [ApiVpcEndpointCreateProps](#apivpcendpointcreateprops)

Create a VPC Endpoint from an existing VPC.

## IAM Least privilege

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "ec2:AllocateAddress",
        "ec2:AssociateRouteTable",
        "ec2:AttachInternetGateway",
        "ec2:CreateInternetGateway",
        "ec2:CreateNatGateway",
        "ec2:CreateRoute",
        "ec2:CreateRouteTable",
        "ec2:CreateSubnet",
        "ec2:CreateTags",
        "ec2:CreateVpc",
        "ec2:DeleteInternetGateway",
        "ec2:DeleteNatGateway",
        "ec2:DeleteRoute",
        "ec2:DeleteRouteTable",
        "ec2:DeleteSubnet",
        "ec2:DeleteTags",
        "ec2:DeleteVpc",
        "ec2:DescribeAddresses",
        "ec2:DescribeAvailabilityZones",
        "ec2:DescribeInternetGateways",
        "ec2:DescribeNatGateways",
        "ec2:DescribeRouteTables",
        "ec2:DescribeSubnets",
        "ec2:DescribeVpcs",
        "ec2:DetachInternetGateway",
        "ec2:DisassociateRouteTable",
        "ec2:ModifySubnetAttribute",
        "ec2:ModifyVpcAttribute",
        "ec2:ReleaseAddress",
        "ec2:ReplaceRoute",
        "ssm:GetParameters"
      ],
      "Resource": "*"
    }
  ]
}
```

## Development

### Prerequisites

- [EditorConfig][editorconfig] (Optional)
- [Git][git]
- [Node.js][nodejs] 17

### Setup

```sh
cd vpc-jsii-component
npm install
```

[aws-cdk]: https://aws.amazon.com/cdk
[aws-cdk-construct]: https://docs.aws.amazon.com/cdk/api/v2/docs/constructs.Construct.html
[aws-cdk-ec2-ivpc]: https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_ec2.IVpc.html
[aws-cdk-ec2-subnet-configuration]: https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_ec2.SubnetConfiguration.html
[aws-cdk-ec2-subnet-selection]: https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_ec2.SubnetSelection.html
[aws-cdk-ec2-subnet-type]: https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_ec2.SubnetType.html
[badge-aws-cdk]: https://img.shields.io/github/package-json/dependency-version/stack-spot/vpc-jsii-component/dev/aws-cdk-lib
[badge-jsii]: https://img.shields.io/github/package-json/dependency-version/stack-spot/vpc-jsii-component/dev/jsii
[badge-license]: https://img.shields.io/github/license/stack-spot/vpc-jsii-component
[badge-npm-downloads]: https://img.shields.io/npm/dt/@stackspot/cdk-vpc?label=downloads%20%28npm%29
[badge-npm-version]: https://img.shields.io/npm/v/@stackspot/cdk-vpc
[badge-nuget-downloads]: https://img.shields.io/nuget/dt/StackSpot.Cdk.Vpc?label=downloads%20%28NuGet%29
[badge-nuget-version]: https://img.shields.io/nuget/vpre/StackSpot.Cdk.Vpc
[editorconfig]: https://editorconfig.org/
[git]: https://git-scm.com/downloads
[jsii]: https://aws.github.io/jsii/
[license]: https://github.com/stack-spot/vpc-jsii-component/blob/main/LICENSE
[nodejs]: https://nodejs.org/en/download/
[npm-package]: https://www.npmjs.com/package/@stackspot/cdk-vpc
[nuget-package]: https://www.nuget.org/packages/StackSpot.Cdk.Vpc
