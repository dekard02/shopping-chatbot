variable "db_username" {
  description = "RDS admin username"
  type        = string
  default     = "adminuser"
}

variable "db_password" {
  description = "RDS admin password"
  type        = string
  sensitive   = true
}

variable "jar_file_key" {
  description = "Path to your Spring Boot JAR file"
  type        = string
}
