class Example {
    constructor() {
        console.log('Example service loaded');
    }

    getById(id: number) {
        return {
            id: 1,
            name: 'Example',
        };
    }

    get() {
        return [
            {
                id: 1,
                name: 'Example',
            },
            {
                id: 2,
                name: 'Example 2',
            },
        ];
    }

    create(name: string) {
        return {
            id: 1,
            name: name,
        };
    }
}

export default Example;
