function getUVI (uv: number) {
    uvi = refVal * (uv * 5.625) / 1000
    uvi = uvi * 0.04
    return uvi
}
function init () {
    setReg(VEML6070_ADDR_ARA)
    basic.pause(10)
}
function setReg (command: number) {
    let buf = pins.createBuffer(2);
// basic.pause(10)
    // basic.pause(10)
    // basic.pause(10)
    // basic.pause(10)
    buf[0] = command >> 8
    buf[1] = command & 0x03
    return pins.i2cWriteBuffer(VEML6070_ADDR_L, buf)
}
let uvi = 0
let refVal = 0
let VEML6070_ADDR_ARA = 0
let fnl = 0
let VEML6070_ADDR_H = 57
let VEML6070_ADDR_L = 56
let INTEGRATION_TIME_1_T = 1
let INTEGRATION_TIME_2_T = 2
let INTEGRATION_TIME_4_T = 3
VEML6070_ADDR_ARA = 12
let MSB = 115
let LSB = 113
refVal = 0.4
namespace CIPUV {
init();
    /**
        * Read Temperature in degrees celcius from the SHT2x sensor.
        * Returns a number describing the UV radiation 
    */
    //% blockId="VEML6070"
    //% block="Leer UV"
    export function UVI(): number {
        
        setReg(MSB);
        basic.pause(100);
        let i2cBuffer = pins.i2cReadBuffer(VEML6070_ADDR_L, pins.sizeOf(NumberFormat.UInt8LE) * 7, false);
        let result = i2cBuffer[0] << 8;
        result |= i2cBuffer[1];
        //basic.showNumber(result);
        basic.pause(100);
        setReg(LSB);
        basic.pause(100);
        let i2cBuff = pins.i2cReadBuffer(VEML6070_ADDR_L, pins.sizeOf(NumberFormat.UInt8LE) * 7, false);
        let res = i2cBuff[0] << 8;
        res |= i2cBuff[1];
       
        //basic.showNumber(getUVI(res + result));
        fnl = getUVI(res + result);
        //basic.pause(1000);
    return fnl
    }
}
