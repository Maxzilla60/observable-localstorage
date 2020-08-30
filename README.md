# Observable LocalStorage

A simple module that provides subscribing to changes in LocalStorage as an RxJS Observable.

# Installing

```bash
npm install @maxzilla60/observable-localstorage --registry=https://npm.pkg.github.com/
```

# Usage

The api is intentionally similar to LocalStorage's api, with a `set('key', value)` for updating and a `get('key')` for getting the observable instance.
There is also a `getLatestValue('key')` which will return the current value of the key (not an observable).
The implementation will always try to `JSON.stringify` & `JSON.parse` and will fail silently and just return the string value.

```typescript
import oLocalStorage from '@maxzilla60/observable-localstorage';
import { distinctUntilChanged } from 'rxjs/operators';

oLocalStorage.set('stuff', ['Initial value']);

oLocalStorage.get('stuff')
	.pipe(distinctUntilChanged(arraysMatch)) // Only subscribe to distinct new values
	.subscribe(newValue => {
		// Do stuff with the stuff...
	});
```
