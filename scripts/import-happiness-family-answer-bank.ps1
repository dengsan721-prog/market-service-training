param(
  [string]$XmlPath = (Join-Path $PSScriptRoot '..\..\work\docx-source-20261113\word\document.xml'),
  [string]$OutputPath = (Join-Path $PSScriptRoot '..\data\happiness-family-answer-bank.json')
)

$xml = [xml](Get-Content -Raw -LiteralPath $XmlPath)
$namespace = New-Object System.Xml.XmlNamespaceManager($xml.NameTable)
$namespace.AddNamespace('w', 'http://schemas.openxmlformats.org/wordprocessingml/2006/main')
$moduleNames = @('夫妻相处', '亲子沟通', '情绪相处', '生活习惯', '学习陪伴', '规则与边界', '独立与社交', '隔代与协作', '家庭日常与幸福感', '父母成长与心态')
$texts = @(
  $xml.SelectNodes('//w:body/w:p', $namespace) |
    ForEach-Object { (($_.SelectNodes('.//w:t', $namespace) | ForEach-Object { $_.InnerText }) -join '').Trim() } |
    Where-Object { $_ }
)

$modules = @()
$currentModule = $null
$currentItem = $null
foreach ($text in $texts) {
  if ($moduleNames -contains $text) {
    if ($currentItem) { $currentModule.items += $currentItem; $currentItem = $null }
    $currentModule = [ordered]@{ title = $text; items = @() }
    $modules += $currentModule
    continue
  }
  if ($text -match '^(\d+)\.\s*(.+)$') {
    if ($currentItem) { $currentModule.items += $currentItem }
    $currentItem = [ordered]@{ order = [int]$Matches[1]; title = $Matches[2].Trim(); lines = @() }
    continue
  }
  if ($currentItem) { $currentItem.lines += $text }
}
if ($currentItem) { $currentModule.items += $currentItem }

$result = [ordered]@{
  title = '幸福家庭答案库'
  description = '按家庭关系、亲子沟通、情绪相处、生活习惯等模块整理的 316 条幸福家庭话题与回答。'
  itemCount = (($modules | ForEach-Object { $_.items.Count } | Measure-Object -Sum).Sum)
  modules = $modules
}

$json = $result | ConvertTo-Json -Depth 10
$utf8 = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllText([System.IO.Path]::GetFullPath($OutputPath), $json, $utf8)
Write-Output "Imported $($result.itemCount) items across $($modules.Count) modules to $OutputPath"
