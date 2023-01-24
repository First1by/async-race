export class CarService {
    getCars(): Promise<any> {
        return fetch('http://localhost:3000/garage', {
            method: 'GET',
        }).then((res) => res.json());
    }

    start(id: number): Promise<any> {
        return fetch(
            'http://localhost:3000/engine?' +
                new URLSearchParams({
                    id: id.toString(),
                    status: 'started',
                }),
            {
                method: 'PATCH',
            }
        ).then((res) => res.json());
    }
}
