# PMSA003I

> [!IMPORTANT]
> From NPM v12 onward, NPM will require you to manually approve and then re-run any post-install build scripts when installing dependencies (see https://github.blog/changelog/2026-06-09-upcoming-breaking-changes-for-npm-v12/). Steps for accomplishing this are included in [Installation](#installation).

JavaScript Port of [Adafruit's CircuitPython I2C driver](http://github.com/adafruit/Adafruit_CircuitPython_PM25) for [PMSA003I air quality PM2.5 particulate matter sensors](https://www.adafruit.com/product/4632).

![PMSA003I Module](https://github.com/phasn/PMSA003I/blob/main/examples/module.jpg "PMSA003I Module")

## Contents

- [Installation](#installation)
- [Usage](#usage)
- [API](#api)
- [License](#license)

## Installation

```sh
npm install pmsa003i-adafruit

# If NPM gives you the following warning when installing
#    "npm warn install-scripts 1 package had install scripts blocked because they are not covered by allowScripts:""
# you'll need to run the following:
npm install-scripts approve i2c-bus
npm rebuild
```

## Usage

A more detailed [example script](https://github.com/phasn/PMSA003I/tree/main/examples) is available in the [github repo](https://github.com/phasn/PMSA003I).

### General usage:

```js
import {PMSA003I} from 'pmsa003i-adafruit';

// Open sensor on I2C bus 1
const sensor = new PMSA003I({ bus:1 });

// Get sensor measurements
let data = sensor.readSensorData();
```

## API

#### Class PMSA003I({options})

- bus - EITHER: An [i2c-bus synchronous Bus instance](https://www.npmjs.com/package/i2c-bus#opensyncbusnumber--options), OR: the number of the I2C bus to use.
- address - The I2C address for the sensor. Defaults to 0x12.

Represents a PMSA003I sensor module.

```js
import {PMSA003I} from 'pmsa003i-adafruit';

const sensor = new PMSA003I({ bus:1, address:0x12 });
```

Existing synchronous I2C bus instances can also be passed as `bus` rather than having the class's constructor open a new instance based on a bus number:

```js
import i2c from 'i2c-bus';
import {PMSA003I} from 'pmsa003i-adafruit';

const busNumber = 1;
const synchBus = i2c.openSync(busNumber);
const address = 0x12;

const sensor = new PMSA003I({ bus:synchBus, address });
```

##### P9813.readSensorData()

Run sensor measurements and return an object containing the results.

```js
let data = sensor.readSensorData();

// Returns an object containing measurements in the following format:
//	{
//		pm10Standard:	<Value>,// Units: μg/m^3
//		pm25Standard:	<Value>,// Units: μg/m^3
//		pm100Standard:	<Value>,// Units: μg/m^3
//		pm10Env:		<Value>,// Units: μg/m^3
//		pm25Env:		<Value>,// Units: μg/m^3
//		pm100Env:		<Value>,// Units: μg/m^3
//		particles03um:	<Value>,// Units: mol/0.1L	Total number of 0.3μm diameter particles per 0.1L of air
//		particles05um:	<Value>,// Units: mol/0.1L	Total number of 0.5μm diameter particles per 0.1L of air
//		particles10um:	<Value>,// Units: mol/0.1L	Total number of 1.0μm diameter particles per 0.1L of air
//		particles25um:	<Value>,// Units: mol/0.1L	Total number of 2.5μm diameter particles per 0.1L of air
//		particles50um:	<Value>,// Units: mol/0.1L	Total number of 5.0μm diameter particles per 0.1L of air
//		particles100um:	<Value>,// Units: mol/0.1L	Total number of 10.0μm diameter particles per 0.1L of air
//	}
```

## License

Copyright &copy; 2026, phasn <phasn@proton.me> (https://github.com/phasn).

Licensed under the [MIT License](LICENSE).