import oLocalStorage from './olocalstorage';
import faker from 'faker';
import { distinctUntilChanged } from 'rxjs/operators';

const $ = (id) => document.getElementById(id);
const arraysMatch = function (arr1, arr2) {
	// Check if the arrays are the same length
	if (arr1.length !== arr2.length) { return false; }
	// Check if all items exist and are in the same order
	for (let i = 0; i < arr1.length; i++) {
		if (arr1[i] !== arr2[i]) { return false; }
	}
	// Otherwise, return true
	return true;
};

$('doSomethingButton').addEventListener('click', () => {
	const stuff: any[] = oLocalStorage.getLatestValue('stuff') as any[];
	stuff.push(faker.company.companyName());
	oLocalStorage.set('stuff', stuff);
});
$('doSomethingElseButton').addEventListener('click', () => {
	const stuff: any[] = oLocalStorage.getLatestValue('stuff') as any[];
	stuff.push(123);
	oLocalStorage.set('stuff', stuff);
});
$('doSomethingUselessButton').addEventListener('click', () => {
	oLocalStorage.set('stuff', oLocalStorage.getLatestValue('stuff'));
});

oLocalStorage.get('stuff')
	.pipe(distinctUntilChanged(arraysMatch))
	.subscribe((newValue) => {
		console.log('ding!');
		$('fullOutput').innerHTML = JSON.stringify(newValue);
	});
oLocalStorage.get('stuff')
	.subscribe((newValue) => {
		const filteredValue = (newValue as any[]).filter(v => typeof v === 'number');
		$('numbersOutput').innerHTML = JSON.stringify(filteredValue);
	});

oLocalStorage.set('stuff', ['kak']);
