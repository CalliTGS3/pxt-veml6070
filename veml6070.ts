//% weight=20 color=#0855AA icon="O" block="VEML6070"
namespace VEML6070 {

    const VEML6070_ADDR_ARA = 12
    const VEML6070_ADDR_H = 57
    const VEML6070_ADDR_L = 56
    const MSB = 115
    const LSB = 113
    const REFVAL = 0.4
    const INTEGRATION_TIME_1_T = 1
    const INTEGRATION_TIME_2_T = 2
    const INTEGRATION_TIME_4_T = 3

    function calcUVI(uv: number) {
        let uvi = REFVAL * (uv * 5.625) / 1000
        uvi = uvi * 0.04
        return uvi
    }

    function setReg(command: number) {
        let buf = pins.createBuffer(2);
        buf[0] = command >> 8
        buf[1] = command & 0x03
        return pins.i2cWriteBuffer(VEML6070_ADDR_L, buf)
    }

    //% blockId="VEML6070_INIT" block="Initialisiere UV Sensor"
    export function Init() {
        setReg(VEML6070_ADDR_ARA)
        basic.pause(10)
    }

    /**
        * Returns a number describing the UV radiation(UVI) 
    */
    //% blockId="VEML6070_UVI" block="Ermittle UV Strahlung"
    export function getUVI(): number {
        setReg(MSB);
        basic.pause(100);
        let i2cBuffer = pins.i2cReadBuffer(VEML6070_ADDR_L, pins.sizeOf(NumberFormat.UInt8LE) * 7, false);
        let result = i2cBuffer[0] << 8;
        result |= i2cBuffer[1];
        basic.pause(100);
        setReg(LSB);
        basic.pause(100);
        let i2cBuff = pins.i2cReadBuffer(VEML6070_ADDR_L, pins.sizeOf(NumberFormat.UInt8LE) * 7, false);
        let res = i2cBuff[0] << 8;
        res |= i2cBuff[1];
        let fnl = calcUVI(res + result);
        return fnl
    }
}
