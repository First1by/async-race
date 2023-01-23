import { CarService } from './car.service';
import { Router } from './router';
import './store.scss';

export class Race {
    public router: Router;
    public cars: any[];

    constructor(private _carService: CarService) {
        this.router = new Router({
            mode: 'hash',
            root: '/',
        });

        this.cars = [];
    }

    init(): void {
        this._carService.getCars().then((data) => {
            this.cars = data;
            this.render();
            //отобразить список машин
        });
    }

    public render(): void {
        const filter = document.createElement('div');
        filter.setAttribute('class', 'filter');
        filter.innerHTML = `
        <div>
            <button>To garage</button>
            <button>To winners</button>
        </div>
        <form class="create">
            <input type="text" id="new-car">
            <input type="color" class="color-choose">
            <input type="submit" class="color1" value="CREATE">
        </form>
        <form >
            <input type="text" id="update-car">
            <input type="color" class="color-choose">
            <input type="submit" class="color1" value="UPDATE">
        </form>
        <div>
            <button>Race</button>
            <button>Reset</button>
            <button class="color1" id="generate">Generate cars</button>
        </div>`;
        document.body.append(filter);

        const container = document.createElement('div');
        container.setAttribute('class', 'container');
        container.innerHTML = `
        <h2 class="garage-count">Garage<span id="count-in-garage"> (104)</span></h2>
        <h3 class="page">Page #1</h3>`;

        /**/
        this.cars.forEach((car) => {
            const track = document.createElement('div');
            track.setAttribute('class', 'track');

            const aButton = document.createElement('div');
            aButton.setAttribute('class', 'point-a');
            aButton.textContent = 'A';
            aButton.onclick = () => {
                this.start(car.id);
            };

            const control = document.createElement('div');
            control.innerHTML = `
                <button class="select">Select</button>
                <button class="remove">Remove</button>
                <span class="model">${car.name}</span>`;

            const carImg = document.createElement('div');
            carImg.setAttribute('class', 'car');
            carImg.innerHTML = `
            
            <div class="point-b">B</div>
            <svg id="car-${car.id}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="${car.color}" width="100px" height="60px" viewBox="0 -39.69 122.88 82.88" version="1.1" id="Layer_1" xml:space="preserve" transform="rotate(0)matrix(-1, 0, 0, 1, 0, 0)">
                <g id="SVGRepo_bgCarrier" stroke-width="0"/>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
                <g id="SVGRepo_iconCarrier"> <style type="text/css">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style> <g> <path class="st0" d="M103.94,23.97c5.39,0,9.76,4.37,9.76,9.76c0,5.39-4.37,9.76-9.76,9.76c-5.39,0-9.76-4.37-9.76-9.76 C94.18,28.34,98.55,23.97,103.94,23.97L103.94,23.97z M23,29.07v3.51h3.51C26.09,30.86,24.73,29.49,23,29.07L23,29.07z M26.52,34.87H23v3.51C24.73,37.97,26.09,36.6,26.52,34.87L26.52,34.87z M20.71,38.39v-3.51H17.2 C17.62,36.6,18.99,37.96,20.71,38.39L20.71,38.39z M17.2,32.59h3.51v-3.51C18.99,29.49,17.62,30.86,17.2,32.59L17.2,32.59z M105.09,29.07v3.51h3.51C108.18,30.86,106.82,29.49,105.09,29.07L105.09,29.07z M108.6,34.87h-3.51v3.51 C106.82,37.97,108.18,36.6,108.6,34.87L108.6,34.87z M102.8,38.39v-3.51h-3.51C99.71,36.6,101.07,37.96,102.8,38.39L102.8,38.39z M99.28,32.59h3.51v-3.51C101.07,29.49,99.71,30.86,99.28,32.59L99.28,32.59z M49.29,12.79c-1.54-0.35-3.07-0.35-4.61-0.28 C56.73,6.18,61.46,2.07,75.57,2.9l-1.94,12.87L50.4,16.65c0.21-0.61,0.33-0.94,0.37-1.55C50.88,13.36,50.86,13.15,49.29,12.79 L49.29,12.79z M79.12,3.13L76.6,15.6l24.13-0.98c2.48-0.1,2.91-1.19,1.41-3.28c-0.68-0.95-1.44-1.89-2.31-2.82 C93.59,1.86,87.38,3.24,79.12,3.13L79.12,3.13z M0.46,27.28H1.2c0.46-2.04,1.37-3.88,2.71-5.53c2.94-3.66,4.28-3.2,8.65-3.99 l24.46-4.61c5.43-3.86,11.98-7.3,19.97-10.2C64.4,0.25,69.63-0.01,77.56,0c4.54,0.01,9.14,0.28,13.81,0.84 c2.37,0.15,4.69,0.47,6.97,0.93c2.73,0.55,5.41,1.31,8.04,2.21l9.8,5.66c2.89,1.67,3.51,3.62,3.88,6.81l1.38,11.78h1.43v6.51 c-0.2,2.19-1.06,2.52-2.88,2.52h-2.37c0.92-20.59-28.05-24.11-27.42,1.63H34.76c3.73-17.75-14.17-23.91-22.96-13.76 c-2.67,3.09-3.6,7.31-3.36,12.3H2.03c-0.51-0.24-0.91-0.57-1.21-0.98c-1.05-1.43-0.82-5.74-0.74-8.23 C0.09,27.55-0.12,27.28,0.46,27.28L0.46,27.28z M21.86,23.97c5.39,0,9.76,4.37,9.76,9.76c0,5.39-4.37,9.76-9.76,9.76 c-5.39,0-9.76-4.37-9.76-9.76C12.1,28.34,16.47,23.97,21.86,23.97L21.86,23.97z"/> </g> </g>
            </svg>
            <img src="./assets/images/flag.png" class="flag" alt="flag">`;

            carImg.prepend(control);
            carImg.append(aButton);
            document.body.append(container);
            container.append(track);
            track.append(carImg);
        });
        /**/
    }

    public start(id: number): void {
        this._carService.start(id).then((data) => {
            const car = document.getElementById(`car-${id}`);
            if (car) {
                car.style.left = 'calc(100% - 100px)';
                car.style.transitionDuration = `${data.distance / data.velocity / 1000}s`;
            }
            //перерисовать машину
        });
    }
}
