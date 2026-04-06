output "cluster_name" {
  description = "Cluster name"
  value       = var.cluster_name
}

output "master_ip" {
  description = "Master node IP address"
  value       = var.master_ip
}

output "worker_ip" {
  description = "Worker node IP address"
  value       = var.worker_ip
}

output "join_token" {
  description = "Token to join in cluster"
  value       = trimspace(ssh_resource.get_token.result)
  sensitive   = true
}

output "k3s_url" {
  description = "K3s master API"
  value       = "https://${var.master_ip}:6443"
}

output "kubeconfig_command" {
  description = "Command to take kubeconfig from master"
  value       = "ssh ${var.user}@${var.master_ip} 'sudo cat /etc/rancher/k3s/k3s.yaml'"
}
