import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import * as cdk from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as s3deploy from 'aws-cdk-lib/aws-s3-deployment';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins';
import * as iam from 'aws-cdk-lib/aws-iam';
type FrontEndBuildResourceStackProps = StackProps;
export class FrontEndBuildResourceStack extends Stack {
  deployFrontEndAppShell() {
    // S3 Bucket for frontend assets
    const websiteBucket = new s3.Bucket(this, 'AppShellWebsiteBucket', {
      websiteIndexDocument: 'index.html',
      publicReadAccess: true,
      blockPublicAccess: new s3.BlockPublicAccess({
        blockPublicAcls: false,
        blockPublicPolicy: false,
        ignorePublicAcls: false,
        restrictPublicBuckets: false,
      }),
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });

    // CloudFront Distribution
    const distribution = new cloudfront.Distribution(this, 'AppShellWebsiteDistribution', {
      defaultBehavior: {
        origin: new origins.S3Origin(websiteBucket),
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      },
      defaultRootObject: 'index.html',
      errorResponses: [
        {
          httpStatus: 403,
          responseHttpStatus: 200,
          responsePagePath: '/index.html',
          ttl: cdk.Duration.minutes(0),
        },
        {
          httpStatus: 404,
          responseHttpStatus: 200,
          responsePagePath: '/index.html',
          ttl: cdk.Duration.minutes(0),
        },
      ],
    });

    new cdk.CfnOutput(this, 'AppShellDistributionDomainName', {
      value: distribution.distributionDomainName,
      description: 'The domain name of the App Shell CloudFront distribution',
    });

    // Deploy frontend assets to S3 bucket
    new s3deploy.BucketDeployment(this, 'DeployAppShellWebsite', {
      sources: [s3deploy.Source.asset('../cdk_front_app_shell/dist')], // Path to your built frontend assets
      destinationBucket: websiteBucket,
    });

    new cdk.CfnOutput(this, 'AppShellWebsiteBucketName', {
      value: websiteBucket.bucketName,
      description: 'The name of the S3 bucket hosting the App Shell website',
    });

    new cdk.CfnOutput(this, 'AppShellWebsiteBucketUrl', {
      value: websiteBucket.bucketWebsiteUrl,
      description: 'The URL of the S3 bucket hosting the App Shell website',
    });
  }
  deployFrontEndLogin() {
      // S3 Bucket for frontend assets
      const websiteBucket = new s3.Bucket(this, 'WebsiteBucket', {
        websiteIndexDocument: 'index.html',
        publicReadAccess: true, // This is okay for a public website
        blockPublicAccess: new s3.BlockPublicAccess({
          blockPublicAcls: false,
          blockPublicPolicy: false,
          ignorePublicAcls: false,
          restrictPublicBuckets: false,
        }),
        removalPolicy: cdk.RemovalPolicy.DESTROY, // NOT recommended for production workloads
        autoDeleteObjects: true, // NOT recommended for production workloads
      });
  
      // CloudFront Distribution
      const distribution = new cloudfront.Distribution(this, 'WebsiteDistribution', {
        defaultBehavior: {
          origin: new origins.S3Origin(websiteBucket),
          viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        },
        defaultRootObject: 'index.html',
        errorResponses: [
          {
            httpStatus: 403,
            responseHttpStatus: 200,
            responsePagePath: '/index.html',
            ttl: cdk.Duration.minutes(0),
          },
          {
            httpStatus: 404,
            responseHttpStatus: 200,
            responsePagePath: '/index.html',
            ttl: cdk.Duration.minutes(0),
          },
        ],
      });
  
      new cdk.CfnOutput(this, 'DistributionDomainName', {
        value: distribution.distributionDomainName,
        description: 'The domain name of the CloudFront distribution',
      });
  
      // Deploy frontend assets to S3 bucket
      new s3deploy.BucketDeployment(this, 'DeployWebsite', {
        sources: [s3deploy.Source.asset('../cdk_front_login/dist')], // Corrected path to your built frontend assets
        destinationBucket: websiteBucket,
      });
  
      new cdk.CfnOutput(this, 'WebsiteBucketName', {
        value: websiteBucket.bucketName,
        description: 'The name of the S3 bucket hosting the website',
      });
  
      new cdk.CfnOutput(this, 'WebsiteBucketUrl', {
        value: websiteBucket.bucketWebsiteUrl,
        description: 'The URL of the S3 bucket hosting the website',
      });
  }
  constructor(scope: Construct, id: string, props?: FrontEndBuildResourceStackProps) { // Corrected type here from previous fix
    super(scope, id, props);
    this.deployFrontEndLogin();
    this.deployFrontEndAppShell();
  }
}
