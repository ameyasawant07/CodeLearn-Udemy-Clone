# PowerShell script to create a shareable package
# Excludes node_modules, .next, and other build files

Write-Host "Creating shareable package..." -ForegroundColor Green

# Get the current directory
$projectDir = Get-Location
$projectName = Split-Path -Leaf $projectDir

# Create a temporary directory for the clean copy
$tempDir = Join-Path $env:TEMP "codelearn-share"
if (Test-Path $tempDir) {
    Remove-Item $tempDir -Recurse -Force
}
New-Item -ItemType Directory -Path $tempDir | Out-Null

Write-Host "Copying files (excluding node_modules, .next, etc.)..." -ForegroundColor Yellow

# Copy all files except excluded ones
Get-ChildItem -Path $projectDir -Recurse | Where-Object {
    $relativePath = $_.FullName.Substring($projectDir.Length + 1)
    -not ($relativePath -like "node_modules\*") -and
    -not ($relativePath -like ".next\*") -and
    -not ($relativePath -like ".git\*") -and
    -not ($relativePath -like "data\*") -and
    -not ($_.Name -eq "package-lock.json")
} | ForEach-Object {
    $destPath = $_.FullName.Replace($projectDir, $tempDir)
    $destDir = Split-Path -Parent $destPath
    if (-not (Test-Path $destDir)) {
        New-Item -ItemType Directory -Path $destDir | Out-Null
    }
    Copy-Item $_.FullName -Destination $destPath -Force
}

# Create the data directory structure (empty)
New-Item -ItemType Directory -Path (Join-Path $tempDir "data") -Force | Out-Null

# Create a .gitkeep file in data directory
"# Database will be auto-created here" | Out-File (Join-Path $tempDir "data\.gitkeep") -Encoding UTF8

Write-Host "Creating ZIP file..." -ForegroundColor Yellow

# Create ZIP file
$zipPath = Join-Path $projectDir "codelearn-shareable.zip"
if (Test-Path $zipPath) {
    Remove-Item $zipPath -Force
}

Compress-Archive -Path "$tempDir\*" -DestinationPath $zipPath -Force

# Clean up temp directory
Remove-Item $tempDir -Recurse -Force

Write-Host "`n✅ Package created successfully!" -ForegroundColor Green
Write-Host "📦 File location: $zipPath" -ForegroundColor Cyan
Write-Host "`nYou can now share this ZIP file with your partners!" -ForegroundColor Yellow
Write-Host "File size: $([math]::Round((Get-Item $zipPath).Length / 1MB, 2)) MB" -ForegroundColor Cyan

