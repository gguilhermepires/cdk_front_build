import { Construct } from "constructs";
import * as dynamodb from "aws-cdk-lib/aws-dynamodb";
import { LODGE_TABLE_NAME } from "../constants/lodge";

interface LodgeDataConstructProps {
}

export class LodgeDataBaseConstruct extends Construct {
  public readonly lodgeTable: dynamodb.Table;

  constructor(scope: Construct, id: string, props?: LodgeDataConstructProps) {
    super(scope, id);

    this.lodgeTable = new dynamodb.Table(this, "LodgeTable", {
      tableName: LODGE_TABLE_NAME,
      partitionKey: {
        name: "PK",
        type: dynamodb.AttributeType.STRING,
      },
      sortKey: {
        name: "SK",
        type: dynamodb.AttributeType.STRING,
      },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
    });
  }
} 