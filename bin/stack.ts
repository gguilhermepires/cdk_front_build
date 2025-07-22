#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { FrontEndBuildResourceStack } from '../stacks/resources';


const app = new cdk.App();
new FrontEndBuildResourceStack(app, 'FrontEndBuildStack', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.AWS_REGION,
  },
});