export function getElementById(id: string): HTMLElement {
	return document.getElementById(id);
}

// https://gomakethings.com/how-to-check-if-two-arrays-are-equal-with-vanilla-js/
export function arraysMatch(arr1: any[], arr2: any[]): boolean {
	// Check if the arrays are the same length
	if (arr1.length !== arr2.length) { return false; }
	// Check if all items exist and are in the same order
	for (let i = 0; i < arr1.length; i++) {
		if (arr1[i] !== arr2[i]) { return false; }
	}
	// Otherwise, return true
	return true;
}
