# Script de Backup - PCM Frontend
$backupDir = ".\backups\2025_01_25"
$sourceDir = "..\frontend\src"

# Criar diretório de backup
New-Item -ItemType Directory -Force -Path $backupDir

# Arquivos para backup
$files = @(
    "pages\Dashboard.tsx",
    "components\filters\MaintenanceFilter.tsx",
    "components\charts\CostByEquipmentChart.tsx",
    "components\TotalValueDisplay.tsx"
)

# Copiar cada arquivo mantendo a estrutura de diretórios
foreach ($file in $files) {
    $sourcePath = Join-Path $sourceDir $file
    $targetPath = Join-Path $backupDir $file
    
    # Criar diretório de destino se não existir
    $targetDir = Split-Path $targetPath -Parent
    if (!(Test-Path $targetDir)) {
        New-Item -ItemType Directory -Force -Path $targetDir
    }
    
    # Copiar arquivo
    Copy-Item -Path $sourcePath -Destination $targetPath -Force
}

Write-Host "Backup concluído em: $backupDir"
