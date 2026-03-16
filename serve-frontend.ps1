$listener = [System.Net.HttpListener]::new()
$listener.Prefixes.Add('http://localhost:4173/')
$listener.Start()
$root = 'c:\Users\DAM\Desktop\prototipo_onda_vital\frontend\dist'
$mime = @{
  '.html'='text/html; charset=utf-8'
  '.js'='application/javascript; charset=utf-8'
  '.css'='text/css; charset=utf-8'
  '.svg'='image/svg+xml'
  '.json'='application/json; charset=utf-8'
  '.png'='image/png'
  '.jpg'='image/jpeg'
  '.jpeg'='image/jpeg'
  '.webp'='image/webp'
}
while ($listener.IsListening) {
  try {
    $context = $listener.GetContext()
    $path = $context.Request.Url.AbsolutePath.TrimStart('/')
    if ([string]::IsNullOrWhiteSpace($path)) { $path = 'index.html' }
    $file = Join-Path $root $path
    if (!(Test-Path $file) -or (Get-Item $file).PSIsContainer) {
      $file = Join-Path $root 'index.html'
    }
    $ext = [System.IO.Path]::GetExtension($file).ToLowerInvariant()
    $bytes = [System.IO.File]::ReadAllBytes($file)
    $context.Response.ContentType = $mime[$ext]
    if (-not $context.Response.ContentType) { $context.Response.ContentType = 'application/octet-stream' }
    $context.Response.ContentLength64 = $bytes.Length
    $context.Response.OutputStream.Write($bytes, 0, $bytes.Length)
    $context.Response.OutputStream.Close()
  } catch {
  }
}
