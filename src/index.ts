import { CarService } from './car.service';
import { Race } from './race';

export const race = new Race(new CarService());
race.init();
