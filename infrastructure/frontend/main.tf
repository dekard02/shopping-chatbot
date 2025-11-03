terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
  backend "s3" {
    bucket  = "ngdangkhoa02-terraform"
    key     = "terraform-state/sunshine-ecommerce-fe/terraform.tfstate"
    region  = "ap-northeast-1"
    encrypt = true
  }
}

provider "aws" {
  region = "ap-northeast-1"
}

# S3 Bucket
resource "aws_s3_bucket" "react_web" {
  bucket = var.bucket_name

  tags = {
    Name = "sunshine-ecommerce-fe"
  }
}

resource "aws_s3_bucket_website_configuration" "react_web_config" {
  bucket = aws_s3_bucket.react_web.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "index.html"
  }

}

# Allow public read access
resource "aws_s3_bucket_public_access_block" "public_access" {
  bucket = aws_s3_bucket.react_web.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

# Bucket policy for public read
resource "aws_s3_bucket_policy" "public_read_policy" {
  bucket = aws_s3_bucket.react_web.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid       = "PublicReadGetObject"
        Effect    = "Allow"
        Principal = "*"
        Action    = "s3:GetObject"
        Resource  = "${aws_s3_bucket.react_web.arn}/*"
      }
    ]
  })
}

