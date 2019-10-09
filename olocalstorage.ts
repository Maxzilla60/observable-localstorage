import { fromEvent, Observable } from 'rxjs';
import { filter, map, pluck } from 'rxjs/operators';

class OLocalStorage {
	public set(key: string, newValue: any): void {
		let value = newValue;
		try { value = JSON.stringify(newValue); } catch (e) { }
		window.localStorage.setItem(key, value);
		window.dispatchEvent(new StorageEvent('storage', {
			key,
			newValue: value,
			storageArea: localStorage,
		}));
	}

	public get(key: string): Observable<any> {
		return fromEvent(window, 'storage').pipe(
			filter((event: StorageEvent) => event.storageArea === localStorage),
			filter((event: StorageEvent) => event.key === key),
			pluck('newValue'),
			// tap(console.log),
			map((newValue: string) => {
				let value = newValue;
				try { value = JSON.parse(value); } catch (e) { }
				return value;
			})
		);
	}

	public getLatestValue(key: string): any {
		let value = window.localStorage.getItem(key);
		try { value = JSON.parse(value); } catch (e) { }
		return value;
	}
}

const oLocalStorage = new OLocalStorage();
export default oLocalStorage;
