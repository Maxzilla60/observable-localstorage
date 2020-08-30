import { fromEvent, Observable } from 'rxjs';
import { filter, map, pluck, startWith } from 'rxjs/operators';

class ObservableLocalStorage {
	private static storageEventObservable: Observable<StorageEvent> =
		(fromEvent(window, 'storage') as Observable<StorageEvent>)
			.pipe(filter((event: StorageEvent) => event.storageArea === localStorage));

	public set(key: string, newValue: any): void {
		const oldValue = this.getLatestValue(key);
		try { newValue = JSON.stringify(newValue); } catch (e) { }
		window.localStorage.setItem(key, newValue);
		// StorageEvent must be triggered manually
		// apparently StorageEvent only triggers if the localStorage is updated from a different tab/page/host
		window.dispatchEvent(new StorageEvent('storage', {
			key, oldValue, newValue,
			storageArea: localStorage,
		}));
	}

	public get(key: string): Observable<any> {
		return ObservableLocalStorage.storageEventObservable.pipe(
			filter((event: StorageEvent) => event.key === key),
			pluck('newValue'),
			map(tryJsonParse),
			startWith(this.getLatestValue(key)),
		);
	}

	public getLatestValue(key: string): any {
		return tryJsonParse(window.localStorage.getItem(key));
	}
}

function tryJsonParse(value: string | null): any {
	if (value) {
		try { value = JSON.parse(value); } catch (e) { }
	}
	return value;
}

const oLocalStorage = new ObservableLocalStorage();
export default oLocalStorage;
