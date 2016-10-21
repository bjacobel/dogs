# dogs

[![Build Status](https://travis-ci.org/bjacobel/dogs.svg?branch=master)](https://travis-ci.org/bjacobel/dogs) [![codecov](https://codecov.io/gh/bjacobel/dogs/branch/master/graph/badge.svg)](https://codecov.io/gh/bjacobel/dogs) [![Dependency Status](https://david-dm.org/bjacobel/dogs.svg)](https://david-dm.org/bjacobel/dogs) [![devDependency Status](https://david-dm.org/bjacobel/dogs/dev-status.svg)](https://david-dm.org/bjacobel/dogs?type=dev)

###Deployment
dogs includes a CloudFormation template that can create & configure all the AWS resources it needs. You'll want to create the CloudFormation stack before you push to your master branch for the first time. To do that:

1. Add AWS configuration to your environment. See the AWS doc on [configuring the command-line interface](http://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html).
2. Add project configuration to `./config.js`, including the name of your project and the domain it'll live at.
3. Build your CloudFormation stack with `yarn run awsUtils -- launch`.

CloudFormation will create the following resources:

- an S3 bucket to host static files
- a CloudFront distribution to serve as a CDN
- an AWS Certificate Manager SSL certificate, so the site can be served over HTTPS
- A Route53 hosted domain, which contains DNS routes for your domain
- A Route53 DNS record for your site
- Another Route53 DNS record for www.<yoursite>, if your site sits at a domain apex

This will take about 30 minutes. While it's going, leaving the `yarn run awsUtils -- launch` process running will tail CloudFormation events to your console. You can also log into the [AWS Management Console](https://console.aws.amazon.com/cloudformation/home#/stacks?filter=active) to track the progress of your stack.

Once it's reached the `CREATE_COMPLETE` status:

1. Get the nameservers (`ns-xxx.awsdns-xxx.tld`) for your new Route53 hosted zone, and point your domain to these nameservers in your registrar's DNS console. These changes may take a while to take effect.
2. Push or merge your code to the `master` branch. Travis will test, lint, bundle and deploy your code to S3, and you should see it at your domain shortly.
