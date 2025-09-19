export function snakeToCamel(str: string) {
	return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
}

export function camelObject(array: any): any {
	return array.map((obj: any) => {
		const newObj: any = {};
		for (const key in obj) {
			const newKey = snakeToCamel(key);
			newObj[newKey] = obj[key];
		}
		return newObj;
	});
}
