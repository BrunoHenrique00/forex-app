package com.myorg;

import software.amazon.awscdk.services.ecs.Cluster;
import software.amazon.awscdk.services.ecs.ContainerImage;
import software.amazon.awscdk.services.ecs.patterns.ApplicationLoadBalancedFargateService;
import software.amazon.awscdk.services.ecs.patterns.ApplicationLoadBalancedTaskImageOptions;
import software.amazon.awscdk.services.elasticloadbalancingv2.ApplicationProtocol;
import software.constructs.Construct;

import java.util.HashMap;
import java.util.Map;

public class FrontEndApp {

    public FrontEndApp(final Construct scope ,  Cluster cluster) {
        Map<String , String> map = new HashMap();
        map.put("API_URL" , "http://awsst-farga-ubui7kysuy7s-1353333963.us-west-2.elb.amazonaws.com/");
        // Create a load-balanced Fargate service for frontend and make it public
        ApplicationLoadBalancedFargateService.Builder.create(scope, "FargateService-frontend")
                .cluster(cluster)           // Required
                .cpu(512)                   // Default is 256
                .desiredCount(1)           // Default is 1
                .taskImageOptions(
                        ApplicationLoadBalancedTaskImageOptions.builder()
                                .environment(map)
                                .image(ContainerImage.fromAsset("../frontend"))
                                .containerPort(3000)
                                .build())
                .memoryLimitMiB(512)       // Default is 512
                .publicLoadBalancer(true)   // Default is false
                .build();
    }
}
