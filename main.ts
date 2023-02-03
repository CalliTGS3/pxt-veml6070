const VEML6070_ADDR_H = 0x39;
const VEML6070_ADDR_L = 0x38;
const INTEGRATION_TIME_1_T = 0x1;
const INTEGRATION_TIME_2_T = 0x2;
const INTEGRATION_TIME_4_T = 0x3;
const VEML6070_ADDR_ARA = 0x0C
const MSB = 0X73;
const LSB = 0X71;
const refVal = 0.4;
let fnl = 0;
function getUVI(uv: number): number {

    let uvi = refVal * (uv * 5.625) / 1000;
    uvi = uvi* 0.04;
    return uvi;
}
function setReg(command: number) {
    let buf = pins.createBuffer(2);
    // basic.pause(10)
    // basic.pause(10)
    buf[0] = command >> 8
    buf[1] = command & 0x03
    return pins.i2cWriteBuffer(VEML6070_ADDR_L, buf)
    }

function init(){
    setReg(VEML6070_ADDR_ARA);
    basic.pause(10);
}

//% color=#4c6ef5 weight=25 icon="\uf043" block="Sensor UV"
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