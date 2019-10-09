import oLocalStorage from './olocalstorage';
import { arraysMatch, getElementById as $ } from './util';
import faker from 'faker';
import { distinctUntilChanged } from 'rxjs/operators';

let distinctEventValueCount = 0;

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
		$('distinctCount').innerHTML = `${++distinctEventValueCount}`;
		$('fullOutput').innerHTML = JSON.stringify(newValue);
	});
oLocalStorage.get('stuff')
	.subscribe((newValue) => {
		const filteredValue = (newValue as any[]).filter(v => typeof v === 'number');
		$('numbersOutput').innerHTML = JSON.stringify(filteredValue);
	});

oLocalStorage.set('stuff', ['kak']);
