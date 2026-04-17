variable "master_ip" {
  description = "Worker node IP"
  default     = "192.168.2.61"
}

variable "worker_ip" {
  description = "Worker node IP"
  default     = "192.168.x.x"
}

variable "user" {
  description = "username to ssh"
  default     = "username"
}

variable "ssh_private_key" {
  description = "path to private key SSH"
  default     = "~/.ssh/id_rsa"
}

variable "cluster_name" {
  description = "name of cluster K3s"
  default     = "lan-cluster"
}
