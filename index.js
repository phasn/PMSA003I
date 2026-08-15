/*
	Based on Adafruit's CircuitPython I2C driver for PM2.5 sesors
	http://github.com/adafruit/Adafruit_CircuitPython_PM25
*/
import process	from 'node:process';
import {Buffer}	from 'node:buffer';
import i2c		from 'i2c-bus';
// import {Gpio}	from 'onoff';


const sleep = ms => Atomics.wait(new Int32Array(new SharedArrayBuffer(4)),0,0,ms);

// const setGpioOutputPin = (pin, name) => {
// 	let PIN = Number.isInteger(pin) && pin>=0					? new Gpio(pin, 'out')
// 			: pin instanceof Gpio && pin.direction()==='out'	? pin
// 			:													new Error(`${name!==undefined ? `${name} pin` : 'Pin'} either invalid or not specified`);
// 	if(PIN instanceof Error) throw PIN;
// 	return PIN;
// };

const setI2CBus = bus => {
	let BUS = Number.isInteger(bus) && bus>=0									? i2c.openSync(bus)
			: bus.constructor.name==='Bus' && Number.isInteger(bus._busNumber)	? bus
			:																	new Error('Bus either invalid or not specified');
	if(BUS instanceof Error) throw BUS;
	return BUS;
};

const sum = buf => {
	let checksum = 0;
	// Iterate through each character in the data
	for (let i=0; i<buf.length; i++){
		// Add the ASCII value of
		//  the character to the checksum
		checksum += buf[i];
	}
	return checksum;
	// Ensure the checksum is within
	//the range of 0-255 by using modulo
	// return checksum % 256;
};

const PMSA003I_DEFAULT_ADDRESS = 0x12;


export class PMSA003I{
	constructor({bus=1, address=PMSA003I_DEFAULT_ADDRESS/*, rstPin=null*/}){
		this.bus		= setI2CBus(bus);
		// this.RST		= rstPin!==null ? setGpioOutputPin(rstPin, 'Reset') : null;
		this.address	= address;

		// if(this.RST!==null){
		// 	// Reset device
		// 	this.CLK.writeSync(0);
		// 	sleep(10);
		// 	this.CLK.writeSync(1);
		// 	// it takes at least a second to start up
		// 	sleep(1000);
		// }
	};

	#readIntoBuffer(){
		let buf = Buffer.alloc(32);//		let buf = new Uint8Array(32);

		try{
			this.bus.i2cReadSync(this.address, buf.length, buf);
			return buf;
		}catch(err){
			console.error('Unable to read from PM2.5 over I2C');
			throw new Error(err);
		}
	};

	readSensorData(){
		/* Read any available data from the air quality sensor and
		return a dictionary with available particulate/quality data

		Note that 'standard' concentrations are those when corrected to
		standard atmospheric conditions (288.15 K, 1013.25 hPa), and
		'environmental' concentrations are those measure in the current
		atmospheric conditions.
		 */

		let buf = this.#readIntoBuffer();

		// check packet header
		if(buf[0]!==0x42 || buf[1]!==0x4d)	throw new Error('Invalid PM2.5 header');

		// check frame length
		let frameLength = buf.subarray(2,4).readUInt16BE(0);
		if(frameLength !== 28)	throw new Error('Invalid PM2.5 frame length');

		// check checksum
		let checksum = buf.subarray(30,32).readUInt16BE(0);
		let check = sum(buf.subarray(0,30))
		if(check !== checksum)	throw new Error('Invalid PM2.5 checksum');

		let aqiReading = {
//pm10		= PM1.0		= particulate matter that is 1 microns (μm) or less in diameter
//pm25		= PM2.5		= particulate matter that is 2.5 microns (μm) or less in diameter
//pm100		= PM10.0	= particulate matter that is 10 microns (μm) or less in diameter
			pm10Standard:	buf.subarray(4,6).readUInt16BE(0),//	Units: μg/m^3
			pm25Standard:	buf.subarray(6,8).readUInt16BE(0),//	Units: μg/m^3
			pm100Standard:	buf.subarray(8,10).readUInt16BE(0),//	Units: μg/m^3
			pm10Env:		buf.subarray(10,12).readUInt16BE(0),//	Units: μg/m^3
			pm25Env:		buf.subarray(12,14).readUInt16BE(0),//	Units: μg/m^3
			pm100Env:		buf.subarray(14,16).readUInt16BE(0),//	Units: μg/m^3
			particles03um:	buf.subarray(16,18).readUInt16BE(0),//	Units: mol/0.1L		Total number of 0.3μm diameter particles per 0.1L of air
			particles05um:	buf.subarray(18,20).readUInt16BE(0),//	Units: mol/0.1L		Total number of 0.5μm diameter particles per 0.1L of air
			particles10um:	buf.subarray(20,22).readUInt16BE(0),//	Units: mol/0.1L		Total number of 1.0μm diameter particles per 0.1L of air
			particles25um:	buf.subarray(22,24).readUInt16BE(0),//	Units: mol/0.1L		Total number of 2.5μm diameter particles per 0.1L of air
			particles50um:	buf.subarray(24,26).readUInt16BE(0),//	Units: mol/0.1L		Total number of 5.0μm diameter particles per 0.1L of air
			particles100um:	buf.subarray(26,28).readUInt16BE(0)//	Units: mol/0.1L		Total number of 10.0μm diameter particles per 0.1L of air
		};

		return aqiReading;
	};
};


export default PMSA003I;
