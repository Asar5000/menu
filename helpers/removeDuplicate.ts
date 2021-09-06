export const removeDuplicate = (data: any): Promise<[]> => {
    const result = data.map((i: any) => (i)).reduce(function (result: { [x: string]: any; }, currentObject: { [x: string]: any }) {
        for (var key in currentObject) {
            if (currentObject.hasOwnProperty(key)) {
                result[key] = currentObject[key];
            }
        }
    }, {});

    return result
}
