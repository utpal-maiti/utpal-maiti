Add-Type -AssemblyName System.Windows.Forms
Add-Type -AssemblyName System.Drawing
$center_x=500
$center_y=500
$radius=100

While($true){
    for($angle=0;$angle-lt 360; $angle += 10){
        # $x=[math]:Round($center_x + $radius *[math]::Cos([math]::PI *$angle /180))
        # $y=[math]:Round($center_y + $radius *[math]::sin([math]::PI *$angle /180))

        #[System.Windows.Forms.cursor]::Position=New-Object System.Drawing.Point($x,$y)
        start-sleep -Seconds 59
        [System.Windows.Forms.Sendkeys]::SendWait("{LEFT}")

    }
}