output "rds_endpoint" {
  value = aws_db_instance.mssql.endpoint
}

output "beanstalk_url" {
  value = aws_elastic_beanstalk_environment.env.endpoint_url
}
