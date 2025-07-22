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
     // 1. S3 Bucket for the Shell Application (cdk_front_app_shell)
    // This bucket will store the static assets (HTML, CSS, JS) of your main shell application.
    const shellAppBucket = new s3.Bucket(this, 'ShellAppBucket', {
      bucketName: 'cdk-front-app-shell-assets', // Choose a unique bucket name
      publicReadAccess: false, // Best practice: Block public access
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      removalPolicy: cdk.RemovalPolicy.DESTROY, // For development, consider RETAIN for production
      autoDeleteObjects: true, // For development, consider false for production
    });

    // 2. S3 Bucket for the Login Microfrontend (cdk_front_login)
    // This bucket will store the static assets of your login microfrontend.
    const loginMfBucket = new s3.Bucket(this, 'LoginMicrofrontendBucket', {
      bucketName: 'cdk-front-login-mf-assets', // Choose a unique bucket name
      publicReadAccess: false,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });

    // 3. Origin Access Control (OAC) for CloudFront to securely access S3 buckets
    // Use CfnOriginAccessControl (L1 construct) as OriginAccessControl (L2) is not available in 2.206.0
    const oac = new cloudfront.CfnOriginAccessControl(this, 'S3OriginAccessControl', {
      originAccessControlConfig: {
        name: 'S3BucketOAC',
        originAccessControlOriginType: 's3',
        signingBehavior: 'always',
        signingProtocol: 'sigv4',
      },
    });

    // 4. CloudFront Distribution for the Shell Application and Microfrontends
    const distribution = new cloudfront.Distribution(this, 'FrontendDistribution', {
      defaultRootObject: 'index.html',
      defaultBehavior: {
        origin: new origins.S3Origin(shellAppBucket, {
          originAccessControlId: oac.attrId, // Use oac.attrId for L1 CfnOriginAccessControl
        }),
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        cachePolicy: cloudfront.CachePolicy.CACHING_OPTIMIZED,
      },
      additionalBehaviors: {
        '/login-mf/*': {
          origin: new origins.S3Origin(loginMfBucket, {
            originAccessControlId: oac.attrId, // Use oac.attrId for L1 CfnOriginAccessControl
          }),
          viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
          cachePolicy: cloudfront.CachePolicy.CACHING_OPTIMIZED,
        },
      },
      // Error responses to handle client-side routing (e.g., React Router, Vue Router)
      // This ensures that direct access to sub-paths (like /login) will still load index.html
      // allowing your client-side router to handle the route.
      errorResponses: [
        {
          httpStatus: 403, // Forbidden
          responseHttpStatus: 200, // Respond with OK
          responsePagePath: '/index.html', // Serve index.html
          ttl: cdk.Duration.minutes(0), // Do not cache error responses
        },
        {
          httpStatus: 404, // Not Found
          responseHttpStatus: 200, // Respond with OK
          responsePagePath: '/index.html', // Serve index.html
          ttl: cdk.Duration.minutes(0),
        },
      ],
    });

    // 5. Grant CloudFront access to S3 buckets using IAM Policy
    // This policy explicitly allows the CloudFront distribution to get objects from your S3 buckets.
    shellAppBucket.addToResourcePolicy(new iam.PolicyStatement({
      actions: ['s3:GetObject'],
      resources: [shellAppBucket.arnForObjects('*')],
      principals: [new iam.ServicePrincipal('cloudfront.amazonaws.com')],
      conditions: {
        StringEquals: {
          'AWS:SourceArn': `arn:aws:cloudfront::${cdk.Aws.ACCOUNT_ID}:distribution/${distribution.distributionId}`,
        },
      },
    }));

    loginMfBucket.addToResourcePolicy(new iam.PolicyStatement({
      actions: ['s3:GetObject'],
      resources: [loginMfBucket.arnForObjects('*')],
      principals: [new iam.ServicePrincipal('cloudfront.amazonaws.com')],
      conditions: {
        StringEquals: {
          'AWS:SourceArn': `arn:aws:cloudfront::${cdk.Aws.ACCOUNT_ID}:distribution/${distribution.distributionId}`,
        },
      },
    }));

    // 6. Deploy Shell Application assets to S3
    // This will upload the contents of your shell's build directory to its S3 bucket
    // and invalidate the CloudFront cache for all paths.
    new s3deploy.BucketDeployment(this, 'DeployShellApp', {
      sources: [s3deploy.Source.asset(path.join('c:', 'Users', 'GUILHERME', 'Desktop', 'code', 'cdk front', 'cdk_front_app_shell', 'build'))],
      destinationBucket: shellAppBucket,
      distribution: distribution,
      distributionPaths: ['/*'], // Invalidate all paths in CloudFront after deployment
    });

    // 7. Deploy Login Microfrontend assets to S3
    // This will upload the contents of your login microfrontend's build directory to its S3 bucket
    // and invalidate the CloudFront cache for paths related to this microfrontend.
    new s3deploy.BucketDeployment(this, 'DeployLoginMicrofrontend', {
      sources: [s3deploy.Source.asset(path.join('c:', 'Users', 'GUILHERME', 'Desktop', 'code', 'cdk front', 'cdk_front_login', 'build'))],
      destinationBucket: loginMfBucket,
      distribution: distribution, // Invalidate the main distribution
      distributionPaths: ['/login-mf/*', '/login-mf/remoteEntry.js'], // Invalidate specific paths for the microfrontend
    });

    // Output the CloudFront distribution domain name
    new cdk.CfnOutput(this, 'CloudFrontDomain', {
      value: distribution.distributionDomainName,
      description: 'The domain name of the CloudFront distribution',
    });
}
}
