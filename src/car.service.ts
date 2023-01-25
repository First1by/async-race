import { CarsObject } from './cars-object.interface'

export class CarService {
    getCars(): Promise<CarsObject[]> {
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

    create(car: any): Promise<{id: number}> {
        return fetch('http://localhost:3000/garage', {
            method: 'POST',
            body: car,
        }).then((res) => res.json());
    }

    delete(id: number): Promise<void> {
        return fetch(`http://localhost:3000/garage/${id}`, {
            method: 'DELETE',
        }).then((res) => res.json());
    }
}
