import { fromEvent, Observable } from 'rxjs';
import { filter, map, pluck } from 'rxjs/operators';

class OLocalStorage {
	public set(key: string, newValue: any): void {
		try { newValue = JSON.stringify(newValue); } catch (e) { }
		window.localStorage.setItem(key, newValue);

		window.dispatchEvent(new StorageEvent('storage', {
			key,
			// oldValue?
			newValue,
			storageArea: localStorage,
		}));
	}

	public get(key: string): Observable<any> {
		return fromEvent(window, 'storage').pipe(
			filter((event: StorageEvent) => event.storageArea === localStorage),
			filter((event: StorageEvent) => event.key === key),
			pluck('newValue'),
			map(tryJsonParse)
		);
	}

	public getLatestValue(key: string): any {
		return tryJsonParse(window.localStorage.getItem(key));
	}
}

function tryJsonParse(value: string): any {
	try { value = JSON.parse(value); } catch (e) { }
	return value;
}

const oLocalStorage = new OLocalStorage();
export default oLocalStorage;
