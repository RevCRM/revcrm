
import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

buildscript {
    repositories {
        mavenCentral()
    }
    dependencies {
        classpath("org.jmailen.gradle:kotlinter-gradle:1.20.1")
    }
}

plugins {
    kotlin("jvm") version "1.3.11"
    id("org.jetbrains.kotlin.plugin.noarg") version "1.3.11"
    id("org.jetbrains.kotlin.kapt") version "1.3.11"
    id("com.moowork.node") version "1.2.0"
    id("name.remal.check-updates") version "1.0.94"
}

repositories {
    mavenCentral()
}

subprojects {
    group = "org.revcrm"
    version = "1.0"

    apply(plugin = "org.jetbrains.kotlin.jvm")
    apply(plugin = "org.jetbrains.kotlin.plugin.noarg")
    apply(plugin = "org.jetbrains.kotlin.kapt")
    apply(plugin = "org.jmailen.kotlinter")
    apply(plugin = "com.moowork.node")
    apply(plugin = "name.remal.check-updates")

    repositories {
        mavenCentral()
        jcenter()
    }

    dependencies {
        implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8")
        implementation("org.jetbrains.kotlin:kotlin-reflect:1.3.11")
        implementation("org.koin:koin-core:1.0.1")
        implementation("xyz.morphia.morphia:core:1.4.0")
        implementation("org.mongodb:mongo-java-driver:3.9.1")
        implementation("org.hibernate:hibernate-validator:6.0.14.Final")
        implementation("org.glassfish:javax.el:3.0.1-b09")
        kapt("org.hibernate:hibernate-validator-annotation-processor:6.0.14.Final")
        implementation("ch.qos.logback:logback-core:1.2.3")
        implementation("ch.qos.logback:logback-classic:1.2.3")

        testImplementation("org.koin:koin-test:1.0.1")
        testImplementation("org.assertj:assertj-core:3.11.1")
        testImplementation("org.junit.jupiter:junit-jupiter-api:5.3.1")
        testImplementation("io.mockk:mockk:1.8.10")
        testRuntimeOnly("org.junit.jupiter:junit-jupiter-engine:5.3.1")
    }

    noArg {
        annotation("xyz.morphia.annotations.Entity")
        annotation("org.revcrm.annotations.EmbeddedEntity")
    }
    
    kapt {
        arguments {
            arg("methodConstraintsSupported", "false")
            arg("verbose", "true")
        }
    }

    tasks.withType<KotlinCompile>().configureEach {
        kotlinOptions {
            jvmTarget = "1.8"
        }
    }

//    tasks {
//        test {
//            useJUnitPlatform()
//            reports.html.enabled = false
//        }
//    }

    node {
        version = "10.14.1"
        npmVersion = "6.4.1"
        download = true
    }
}
