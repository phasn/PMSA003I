import {PMSA003I} from 'pmsa003i-adafruit';

const units = {
	pm10Standard:	'μg/m^3',
	pm25Standard:	'μg/m^3',
	pm100Standard:	'μg/m^3',
	pm10Env:		'μg/m^3',
	pm25Env:		'μg/m^3',
	pm100Env:		'μg/m^3',
	particles03um:	'mol/0.1L',//	Total number of 0.3μm diameter particles per 0.1L of air
	particles05um:	'mol/0.1L',//	Total number of 0.5μm diameter particles per 0.1L of air
	particles10um:	'mol/0.1L',//	Total number of 1.0μm diameter particles per 0.1L of air
	particles25um:	'mol/0.1L',//	Total number of 2.5μm diameter particles per 0.1L of air
	particles50um:	'mol/0.1L',//	Total number of 5.0μm diameter particles per 0.1L of air
	particles100um:	'mol/0.1L',//	Total number of 10.0μm diameter particles per 0.1L of air
};

const roundTo = (val, decPlace) => Math.round(val * (10 ** decPlace)) / (10 ** decPlace);


// Open sensor on I2C bus 1
const sensor = new PMSA003I({ bus:1 });


const getMeasurements = (dev) => {
	// Get sensor measurements
	let data = dev.readSensorData();

	console.clear();
	console.log('--------------------------------');

	for(let measurement in data){
		let label = `${measurement}:`.padEnd(15, ' ');
		let value = roundTo(data[measurement], 4);
		let unit = units[measurement];

		console.log(`${measurement} ${value} ${unit}`);
	}

	console.log('--------------------------------');
};


setInterval(getMeasurements, 1000, sensor);
