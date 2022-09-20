package com.myorg;

import software.amazon.awscdk.services.ecs.Cluster;
import software.amazon.awscdk.services.ecs.ContainerImage;
import software.amazon.awscdk.services.ecs.patterns.ApplicationLoadBalancedFargateService;
import software.amazon.awscdk.services.ecs.patterns.ApplicationLoadBalancedTaskImageOptions;
import software.amazon.awscdk.services.elasticloadbalancingv2.ApplicationProtocol;
import software.constructs.Construct;

public class BackEndApp {

    public BackEndApp(final Construct scope, Cluster cluster) {



        // Create a load-balanced Fargate service for backend and make it public
        ApplicationLoadBalancedFargateService.Builder.create(scope, "FargateService-BackEnd")
                .cluster(cluster)           // Required
                .cpu(512)                   // Default is 256
                .desiredCount(1)            // Default is 1
                .taskImageOptions(
                        ApplicationLoadBalancedTaskImageOptions.builder()
                                .image(ContainerImage.fromAsset("../backend"))
                                .containerPort(8080)
                                .build())
                .memoryLimitMiB(512)       // Default is 512
                .publicLoadBalancer(true)   // Default is false
                .build();
    }
}
