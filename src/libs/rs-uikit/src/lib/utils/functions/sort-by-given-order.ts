export function givenOrderComparator<T>(options: {
    item1: T,
    item2: T,
    order: Array<T>,
}): number {
    const indexOfA = options.order.indexOf(options.item1);
    const indexOfB = options.order.indexOf(options.item2);
    if (indexOfA !== -1 && indexOfB !== -1) {
        return (indexOfA - indexOfB);
    } else if (indexOfA === -1 && indexOfB === -1) {
        return 0;
    } else if (indexOfA !== -1 && indexOfB === 1) {
        return -1;
    } else {
        return 1;
    }
}

export function sortByGivenOrder<T = any>(options: {
    order: Array<string | number>,
    items: Array<T>,
    getSortByAttribute: (item: T) => string | number
}): Array<T> {
    return options.items.sort((a, b) => {
        return givenOrderComparator({
            item1: options.getSortByAttribute(a),
            item2: options.getSortByAttribute(b),
            order: options.order
        });
    });
}
