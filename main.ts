function GoForward () {
    LEDを点灯(true, true)
    maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 100)
    maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 100)
    basic.pause(500)
}
function LEDを点灯 (left: boolean, right: boolean) {
    if (left) {
        maqueen.writeLED(maqueen.LED.LEDLeft, maqueen.LEDswitch.turnOn)
    } else {
        maqueen.writeLED(maqueen.LED.LEDLeft, maqueen.LEDswitch.turnOff)
    }
    if (right) {
        maqueen.writeLED(maqueen.LED.LEDRight, maqueen.LEDswitch.turnOn)
    } else {
        maqueen.writeLED(maqueen.LED.LEDRight, maqueen.LEDswitch.turnOff)
    }
}
function AvoidColision (数値: number) {
    if (maqueen.Ultrasonic(PingUnit.Centimeters) < 数値) {
        LEDを点灯(false, true)
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 100)
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CCW, 100)
        basic.pause(500)
    }
}
music.setVolume(16)
basic.showIcon(IconNames.Heart)
pins.analogWritePin(AnalogPin.P15, 255)
let strip = neopixel.create(DigitalPin.P15, 4, NeoPixelMode.RGB)
strip.showRainbow(1, 360)
basic.forever(function () {
    for (let index = 0; index < 4; index++) {
        LEDを点灯(true, true)
        basic.pause(500)
        LEDを点灯(true, false)
        basic.pause(500)
        LEDを点灯(false, true)
        basic.pause(500)
        LEDを点灯(false, false)
        basic.pause(500)
    }
})
