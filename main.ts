function Left (時間: number, 速度: number) {
    LEDを点灯(true, true)
    maqueen.motorStop(maqueen.Motors.M1)
    maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 速度)
    basic.pause(時間)
}
radio.onReceivedNumber(function (receivedNumber) {
    信号 = receivedNumber
    if (信号 == 0) {
        basic.showArrow(ArrowNames.North)
    } else {
        basic.showIcon(IconNames.No)
    }
})
function Forward (時間: number, 速度: number) {
    maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 速度)
    maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 速度)
    basic.pause(時間)
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
input.onButtonPressed(Button.A, function () {
    while (true) {
        sum_sensor = maqueen.readPatrol(maqueen.Patrol.PatrolLeft) + maqueen.readPatrol(maqueen.Patrol.PatrolRight) * 2
        if (sum_sensor > 1 && 信号 == 1) {
            basic.showIcon(IconNames.Chessboard)
            STOP()
        } else {
            basic.showArrow(ArrowNames.North)
            Forward(1, 100)
        }
    }
})
function Turn (時間: number, 速度: number) {
    LEDを点灯(true, true)
    maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 速度)
    maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CCW, 速度)
    basic.pause(時間)
}
function STOP () {
    maqueen.motorStop(maqueen.Motors.All)
}
input.onButtonPressed(Button.AB, function () {
    信号 = (信号 + 1) % 2
    radio.sendNumber(信号)
})
input.onButtonPressed(Button.B, function () {
    while (true) {
        radio.sendNumber(0)
        basic.showIcon(IconNames.Square)
        basic.pause(5000)
        for (let index = 0; index < 5; index++) {
            basic.showIcon(IconNames.SmallSquare)
            basic.pause(200)
            basic.showLeds(`
                . . . . .
                . . . . .
                . . . . .
                . . . . .
                . . . . .
                `)
            basic.pause(200)
        }
        radio.sendNumber(1)
        basic.showIcon(IconNames.No)
        basic.pause(5000)
    }
})
function AvoidColision (数値: number) {
    if (maqueen.Ultrasonic(PingUnit.Centimeters) < 数値) {
        LEDを点灯(false, true)
        Turn(500, 300)
    }
}
function Right (時間: number, 速度: number) {
    LEDを点灯(true, true)
    maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 速度)
    maqueen.motorStop(maqueen.Motors.M2)
    basic.pause(時間)
}
function Backward (時間: number, 速度: number) {
    LEDを点灯(true, true)
    maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CCW, 速度)
    maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CCW, 速度)
    basic.pause(時間)
}
let sum_sensor = 0
let 信号 = 0
radio.setGroup(1)
信号 = 0
basic.showIcon(IconNames.Happy)
let strip = neopixel.create(DigitalPin.P15, 4, NeoPixelMode.RGB)
