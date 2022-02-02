# vpc-env-jsii-component

Component to create a VPC.

## How to use

Below are all languages supported by the AWS CDK.

### C#

Install the dependency:

```sh
dotnet add package OrangeStack.Components.Env.Vpc
```

Import the construct into your project, for example:

```csharp
using Amazon.CDK;
using Amazon.CDK.AWS.EC2;
using Constructs;
using OrangeStack.Components.Env.Vpc;

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
npm install --save @orange-stack/vpc-env-component
```

Import the construct into your project, for example:

```javascript
const { Stack } = require('aws-cdk-lib');
const { SubnetType } = require('aws-cdk-lib/aws-ec2');
const { VpcEnvComponent } = require('@orange-stack/vpc-env-component');

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
npm install --save @orange-stack/vpc-env-component
```

Import the construct into your project, for example:

```typescript
import { Stack, StackProps } from 'aws-cdk-lib';
import { SubnetType } from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';
import { VpcEnvComponent } from '@orange-stack/vpc-env-component';

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

[aws-cdk-subnet-configuration]: https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_ec2.SubnetConfiguration.html
[aws-cdk-subnet-selection]: https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_ec2.SubnetSelection.html
[aws-cdk-subnet-type]: https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_ec2.SubnetType.html
[aws-cdk-ivpc]: https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_ec2.IVpc.html
[editorconfig]: https://editorconfig.org/
[git]: https://git-scm.com/downloads
[nodejs]: https://nodejs.org/en/download/
