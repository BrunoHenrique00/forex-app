package com.myorg;

import software.constructs.Construct;
import software.amazon.awscdk.Stack;
import software.amazon.awscdk.StackProps;
import software.amazon.awscdk.services.ec2.*;
import software.amazon.awscdk.services.ecs.*;

public class AwsStack extends Stack {
    public AwsStack(final Construct scope, final String id) {
        this(scope, id, null);
    }

    public AwsStack(final Construct scope, final String id, final StackProps props) {
        super(scope, id, props);

        Vpc vpc = Vpc.Builder.create(this, "MyVpc-Java") // at production should put a env in "id" param
                .maxAzs(3)  // Default is all AZs in region
                .build();

        Cluster cluster = Cluster.Builder.create(this, "Cluster-Academy")
                .vpc(vpc).build();

        new FrontEndApp(this , cluster);
        new BackEndApp(this , cluster);
    }
}
