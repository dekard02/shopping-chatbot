terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
  backend "s3" {
    bucket  = "ngdangkhoa02-terraform"
    key     = "terraform-state/assistant-agent-py/terraform.tfstate"
    region  = "ap-northeast-1"
    encrypt = true
  }
}

provider "aws" {
  region = "ap-northeast-1"
}


# --- Use default VPC/Subnets ---
data "aws_vpc" "default" {
  default = true
}

resource "aws_s3_object" "agent_deploy_zip" {
  bucket = "ngdangkhoa02-terraform"
  key    = "build/assistant-agent-py.zip"
  source = "${path.module}/../../src/assistant-agent/assistant-agent-py.zip"
  etag   = filemd5("${path.module}/../../src/assistant-agent/assistant-agent-py.zip")

}

resource "aws_elastic_beanstalk_application" "agent_app" {
  name        = "sunshine-assistant-agent-app"
  description = "assistant-agent app with LangGraph endpoint"
}

# --- IAM Role for Elastic Beanstalk ---
resource "aws_iam_role" "eb_instance_role" {
  name = "sunshine-eb-instance-role"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect = "Allow"
      Principal = {
        Service = "ec2.amazonaws.com"
      }
      Action = "sts:AssumeRole"
    }]
  })
}

resource "aws_iam_role_policy_attachment" "eb_instance_role_attachment" {
  role       = aws_iam_role.eb_instance_role.name
  policy_arn = "arn:aws:iam::aws:policy/AWSElasticBeanstalkWebTier"
}

resource "aws_iam_instance_profile" "eb_instance_profile" {
  name = "sunshine-eb-instance-profile"
  role = aws_iam_role.eb_instance_role.name
}

resource "aws_elastic_beanstalk_application_version" "assistant_agent_app_version" {
  name        = "v1-${timestamp()}"
  application = aws_elastic_beanstalk_application.agent_app.name
  description = "Terraform-managed FastAPI version"
  bucket      = aws_s3_object.agent_deploy_zip.bucket
  key         = aws_s3_object.agent_deploy_zip.key
}

# --- Elastic Beanstalk Environment ---
resource "aws_elastic_beanstalk_environment" "assistant_agent_app_env" {
  name                = "sunshine-fastapi-env"
  application         = aws_elastic_beanstalk_application.agent_app.name
  solution_stack_name = "64bit Amazon Linux 2023 v4.7.5 running Python 3.12"
  version_label       = aws_elastic_beanstalk_application_version.assistant_agent_app_version.name

  setting {
    namespace = "aws:autoscaling:launchconfiguration"
    name      = "IamInstanceProfile"
    value     = aws_iam_instance_profile.eb_instance_profile.name
  }

  setting {
    namespace = "aws:elasticbeanstalk:application:environment"
    name      = "PORT"
    value     = "8000"
  }

  setting {
    namespace = "aws:elasticbeanstalk:container:python"
    name      = "WSGIPath"
    value     = "main.py"
  }

}
