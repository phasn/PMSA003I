import {PMSA003I}				from '../index.js';
import {API as mainAPI}			from './interactive.API.js';
import {initRL, useAPIs}		from '@phasn/prototyping-cli';

const API = {};
useAPIs(mainAPI, API);

API.sensor = new PMSA003I();
initRL(API);
