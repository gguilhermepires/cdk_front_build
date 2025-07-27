import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import * as cdk from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as s3deploy from 'aws-cdk-lib/aws-s3-deployment';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as path from 'path';
type FrontEndBuildResourceStackProps = StackProps;
export class FrontEndBuildResourceStack extends Stack {
  constructor(scope: Construct, id: string, props?: FrontEndBuildResourceStackProps) { // Corrected type here from previous fix
    super(scope, id, props);
   
}
}
