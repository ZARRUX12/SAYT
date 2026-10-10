Add-Type -AssemblyName System.Drawing
$path = 'D:\SCRIPTS\SAYT\public\images\gold_paper_plane.png'
$bmp = New-Object System.Drawing.Bitmap($path)
$w = $bmp.Width
$h = $bmp.Height
Write-Host "Image dimensions: $w x $h"
$minX = $w; $maxX = 0; $minY = $h; $maxY = 0; $topTipX = 0; $topTipY = $h
for ($y = 0; $y -lt $h; $y += 2) {
    for ($x = 0; $x -lt $w; $x += 2) {
        $c = $bmp.GetPixel($x, $y)
        if ($c.A -gt 40) {
            if ($x -lt $minX) { $minX = $x }
            if ($x -gt $maxX) { $maxX = $x }
            if ($y -lt $minY) { $minY = $y }
            if ($y -gt $maxY) { $maxY = $y }
            if ($y -lt $topTipY) { $topTipY = $y; $topTipX = $x }
        }
    }
}
$bmp.Dispose()
Write-Host "Bounding: X from $minX to $maxX, Y from $minY to $maxY"
Write-Host "Nose tip: X=$topTipX, Y=$topTipY"
$cx = ($minX + $maxX) / 2.0
$cy = ($minY + $maxY) / 2.0
Write-Host "Bounding Center: cx=$cx, cy=$cy"
$canvasCx = $w / 2.0
$canvasCy = $h / 2.0
Write-Host "Canvas Center: canvasCx=$canvasCx, canvasCy=$canvasCy"
$dxFromCanvas = $topTipX - $canvasCx
$dyFromCanvas = $canvasCy - $topTipY
$radCanvas = [Math]::Atan2($dyFromCanvas, $dxFromCanvas)
$degCanvas = $radCanvas * 180.0 / [Math]::PI
Write-Host "From Canvas Center: dx=$dxFromCanvas, dy=$dyFromCanvas, rad=$radCanvas, deg=$degCanvas"
$dxFromBound = $topTipX - $cx
$dyFromBound = $cy - $topTipY
$radBound = [Math]::Atan2($dyFromBound, $dxFromBound)
$degBound = $radBound * 180.0 / [Math]::PI
Write-Host "From Bounding Center: dx=$dxFromBound, dy=$dyFromBound, rad=$radBound, deg=$degBound"
