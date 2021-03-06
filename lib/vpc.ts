import {
  InterfaceVpcEndpoint,
  ISecurityGroup,
  IVpc,
  Peer,
  Port,
  SecurityGroup,
  SubnetConfiguration,
  SubnetFilter,
  SubnetSelection,
  SubnetType,
  Vpc as AwsVpc,
} from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';

/**
 * Vpc construct props.
 */
export interface VpcProps {
  /**
   * Select subnets only in the given AZs.
   */
  readonly subnetsAvailabilityZones?: string[];

  /**
   * Select the subnet group with the given name.
   */
  readonly subnetsGroupName?: string;

  /**
   * The identifiers of the subnets to be used.
   */
  readonly subnetsIds?: string[];

  /**
   * If true, return at most one subnet per AZ.
   */
  readonly subnetsOnePerAz?: boolean;

  /**
   * Type of subnet to be used.
   *
   * @default SubnetType.PUBLIC
   */
  readonly subnetsType?: SubnetType;

  /**
   * If don't inform the vpcId, a VPC with this CIDR will be created.
   *
   * @default 10.0.0.0/16
   */
  readonly vpcCidr?: string;

  /**
   * Whether to match the default VPC.
   */
  readonly vpcDefault?: boolean;

  /**
   * The identifier of the VPC to be used.
   */
  readonly vpcId?: string;

  /**
   * Define the maximum number of AZs to be used.
   *
   * @default 99
   */
  readonly vpcMaxAzs?: number;

  /**
   * The VPC name.
   */
  readonly vpcName: string;

  /**
   * Optional to override inferred region.
   */
  readonly vpcRegion?: string;

  /**
   * Specify configuration parameters for a single subnet group in a VPC.
   */
  readonly vpcSubnetConfiguration?: SubnetConfiguration[];
}

/**
 * API VPC Endpoint method props.
 */
export interface ApiVpcEndpointCreateProps {
  /**
   * Stack name.
   */
  readonly stackName: string;

  /**
   * Optional security group.
   */
  readonly securityGroupId?: string;

  /**
   * The type of subnet to use.
   */
  readonly subnetType: SubnetType;

  /**
   * Endpoint port number.
   */
  readonly port: number;
}

/**
 * Component to create a VPC.
 */
export class Vpc extends Construct {
  /**
   * Subnets used on the VPC.
   */
  public readonly subnets: SubnetSelection;

  /**
   * VPC to be used.
   */
  public readonly virtualPrivateCloud: IVpc;

  /**
   * Creates a new instance of class Vpc.
   *
   * @param {Construct} scope The construct within which this construct is defined.
   * @param {string} id Identifier to be used in AWS CloudFormation.
   * @param {VpcProps} [props={}] Parameters of the class Vpc.
   * @see {@link https://docs.aws.amazon.com/cdk/v2/guide/constructs.html#constructs_init|AWS CDK Constructs}
   */
  constructor(scope: Construct, id: string, props: VpcProps) {
    super(scope, id);

    if (props.vpcId) {
      this.virtualPrivateCloud = AwsVpc.fromLookup(this, props.vpcName, {
        isDefault:
          typeof props.vpcDefault === 'boolean' ? props.vpcDefault : undefined,
        region: props.vpcRegion,
        vpcId: props.vpcId,
        vpcName: props.vpcName,
      });
    } else {
      this.virtualPrivateCloud = new AwsVpc(this, `Vpc${props.vpcName}`, {
        cidr: props.vpcCidr || '10.0.0.0/16',
        maxAzs: props.vpcMaxAzs || 99,
        subnetConfiguration: props.vpcSubnetConfiguration,
        vpcName: props.vpcName,
      });
    }

    this.subnets = this.virtualPrivateCloud.selectSubnets({
      availabilityZones: props.subnetsAvailabilityZones,
      onePerAz:
        typeof props.subnetsOnePerAz === 'boolean'
          ? props.subnetsOnePerAz
          : undefined,
      subnetFilters: props.subnetsIds
        ? [SubnetFilter.byIds(props.subnetsIds)]
        : undefined,
      subnetGroupName: props.subnetsGroupName,
      subnetType: props.subnetsType,
    });
  }

  /**
   * Create Vpc endpoint for Api Gateway.
   *
   * @param {Construct} scope The construct within which this construct is defined.
   * @param {IVpc} vpc The Interface IVpc.
   * @param {ApiVpcEndpointCreateProps} props API VPC Endpoint props.
   */
  public static createApiVpcEndpoint(
    scope: Construct,
    vpc: IVpc,
    props: ApiVpcEndpointCreateProps
  ) {
    let securityGroup: ISecurityGroup;
    if (props.securityGroupId) {
      securityGroup = SecurityGroup.fromSecurityGroupId(
        scope,
        'GetExistingSG',
        props.securityGroupId
      );
    } else {
      securityGroup = new SecurityGroup(scope, `ApiSG${props.stackName}`, {
        vpc,
        allowAllOutbound: true,
        securityGroupName: `sg_apivpce_${props.stackName}`,
      });
      securityGroup.addIngressRule(
        Peer.ipv4(vpc.vpcCidrBlock),
        Port.tcp(props.port)
      );
    }

    return new InterfaceVpcEndpoint(scope, `IVpce${props.stackName}`, {
      vpc,
      service: {
        name: `com.amazonaws.${vpc.stack.region}.execute-api`,
        port: props.port,
      },
      subnets: { subnetType: props.subnetType },
      privateDnsEnabled: true,
      securityGroups: [securityGroup],
    });
  }
}
