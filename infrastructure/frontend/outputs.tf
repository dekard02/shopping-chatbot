output "s3_website_url" {
  value = aws_s3_bucket_website_configuration.react_web_config.website_endpoint
}
