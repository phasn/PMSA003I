import uC, {__cmd}	from '@phasn/prototyping-cli';


export const API = {
	commands:{
	//	======================
	//	<<<<<<<< read >>>>>>>>
	//	======================
		read:{
			description: 'Returns the current measurements from the sensor',
			syntax:[`${__cmd('read')}`],
			aliases:[
				'readSensorData',
				'readSensor',
				'getMeasurements',
				'measure',
			],
			execute(){
				if(!this.sensor) return console.error('ERROR: No open sensor detected');

				const data = this.sensor.readSensorData();
				const time = new Date();

				console.br();
				console.line('blue');
				console.log(`${uC.r}${uC.lmgt}${time.toDateString()} ${uC.ylw}${time.toLocaleTimeString()}${uC.r}`);
				console.line('blue');
				console.log(`${uC.lylw}PM1.0:${uC.r}`);
				console.log(`	${uC.cyn}${data.pm10Standard} ${uC.mgt}${data.units.pm10Standard}${uC.r}`);
				console.log(`${uC.lylw}PM2.5:${uC.r}`);
				console.log(`	${uC.cyn}${data.pm25Standard} ${uC.mgt}${data.units.pm25Standard}${uC.r}`);
				console.log(`${uC.lylw}PM10.0:${uC.r}`);
				console.log(`	${uC.cyn}${data.pm100Standard} ${uC.mgt}${data.units.pm100Standard}${uC.r}`);
				console.log(`${uC.lylw}PM1.0 (ENV):${uC.r}`);
				console.log(`	${uC.cyn}${data.pm10Env} ${uC.mgt}${data.units.pm10Env}${uC.r}`);
				console.log(`${uC.lylw}PM2.5 (ENV):${uC.r}`);
				console.log(`	${uC.cyn}${data.pm25Env} ${uC.mgt}${data.units.pm25Env}${uC.r}`);
				console.log(`${uC.lylw}PM10.0 (ENV):${uC.r}`);
				console.log(`	${uC.cyn}${data.pm100Env} ${uC.mgt}${data.units.pm100Env}${uC.r}`);
				console.log(`${uC.lylw}0.3um Particles:${uC.r}`);
				console.log(`	${uC.cyn}${data.particles03um} ${uC.mgt}${data.units.particles03um}${uC.r}`);
				console.log(`${uC.lylw}0.5um Particles:${uC.r}`);
				console.log(`	${uC.cyn}${data.particles05um} ${uC.mgt}${data.units.particles05um}${uC.r}`);
				console.log(`${uC.lylw}1.0um Particles:${uC.r}`);
				console.log(`	${uC.cyn}${data.particles10um} ${uC.mgt}${data.units.particles10um}${uC.r}`);
				console.log(`${uC.lylw}2.5um Particles:${uC.r}`);
				console.log(`	${uC.cyn}${data.particles25um} ${uC.mgt}${data.units.particles25um}${uC.r}`);
				console.log(`${uC.lylw}5.0um Particles:${uC.r}`);
				console.log(`	${uC.cyn}${data.particles50um} ${uC.mgt}${data.units.particles50um}${uC.r}`);
				console.log(`${uC.lylw}10.0um Particles:${uC.r}`);
				console.log(`	${uC.cyn}${data.particles100um} ${uC.mgt}${data.units.particles100um}${uC.r}`);
				console.line('blue');
				console.br();
			}
		},

	//	=====================
	//	<<<<<<<< AQI >>>>>>>>
	//	=====================
		AQI:{
			description: 'Measures and returns AQI (air quality index) measurements',
			syntax:[`${__cmd('AQI')}`],
			aliases:[
				'readAQI',
				'getAQI',
			],
			execute(){
				if(!this.sensor) return console.error('ERROR: No open sensor detected');

				const data = this.sensor.readSensorData();
				const time = new Date();

				console.br();
				console.line('blue');
				console.log(`${uC.r}${uC.lmgt}${time.toDateString()} ${uC.ylw}${time.toLocaleTimeString()}${uC.r}`);
				console.line('blue');
				console.log(`${uC.lylw}PM1.0:${uC.r}`);
				console.log(`	${uC.cyn}${data.pm10Standard} ${uC.mgt}${data.units.pm10Standard}${uC.r}`);
				console.log(`${uC.lylw}PM2.5:${uC.r}`);
				console.log(`	${uC.cyn}${data.pm25Standard} ${uC.mgt}${data.units.pm25Standard}${uC.r}`);
				console.log(`${uC.lylw}PM10.0:${uC.r}`);
				console.log(`	${uC.cyn}${data.pm100Standard} ${uC.mgt}${data.units.pm100Standard}${uC.r}`);
				console.log(`${uC.lylw}PM1.0 (ENV):${uC.r}`);
				console.log(`	${uC.cyn}${data.pm10Env} ${uC.mgt}${data.units.pm10Env}${uC.r}`);
				console.log(`${uC.lylw}PM2.5 (ENV):${uC.r}`);
				console.log(`	${uC.cyn}${data.pm25Env} ${uC.mgt}${data.units.pm25Env}${uC.r}`);
				console.log(`${uC.lylw}PM10.0 (ENV):${uC.r}`);
				console.log(`	${uC.cyn}${data.pm100Env} ${uC.mgt}${data.units.pm100Env}${uC.r}`);
				console.log(`${uC.lylw}0.3um Particles:${uC.r}`);
				console.log(`	${uC.cyn}${data.particles03um} ${uC.mgt}${data.units.particles03um}${uC.r}`);
				console.log(`${uC.lylw}0.5um Particles:${uC.r}`);
				console.log(`	${uC.cyn}${data.particles05um} ${uC.mgt}${data.units.particles05um}${uC.r}`);
				console.log(`${uC.lylw}1.0um Particles:${uC.r}`);
				console.log(`	${uC.cyn}${data.particles10um} ${uC.mgt}${data.units.particles10um}${uC.r}`);
				console.log(`${uC.lylw}2.5um Particles:${uC.r}`);
				console.log(`	${uC.cyn}${data.particles25um} ${uC.mgt}${data.units.particles25um}${uC.r}`);
				console.log(`${uC.lylw}5.0um Particles:${uC.r}`);
				console.log(`	${uC.cyn}${data.particles50um} ${uC.mgt}${data.units.particles50um}${uC.r}`);
				console.log(`${uC.lylw}10.0um Particles:${uC.r}`);
				console.log(`	${uC.cyn}${data.particles100um} ${uC.mgt}${data.units.particles100um}${uC.r}`);
				console.line('blue');
				console.br();
			}
		},
	}
};


export default API;
