type Route = {
    path: string;
    calback: () => void;
};

type RouteOptions = {
    mode: Mode;
    root: string;
};

type Mode = 'history' | 'hash' | null;

export class Router {
    public routes: Route[];
    public mode: Mode = null;
    public root = '/';
    public current: string;
    public intervalTimer: NodeJS.Timer | null;

    public constructor(options: RouteOptions) {
        this.routes = [];
        this.mode = 'hash';
        this.current = '';
        this.intervalTimer = null;

        if (options.mode) {
            this.mode = options.mode;
        }

        if (options.root) {
            this.root = options.root;
        }

        this.listen();
    }

    public add(path: string, calback: (params?: unknown) => void): void {
        this.routes.push({ path, calback });
    }

    public remove(path: string): void {
        for (let i = 0; i < this.routes.length; i += 1) {
            if (this.routes[i].path === path) {
                this.routes.slice(i, 1);
            }
        }
    }

    public flush(): void {
        this.routes = [];
    }

    public clearSlashes(path: string): string {
        return path.toString().replace(/\/$/, '').replace(/^\//, '');
    }

    public getFragment(): string {
        let fragment = '';

        const match = window.location.href.match(/#(.*)$/);
        fragment = match ? match[1] : '';

        return this.clearSlashes(fragment);
    }

    public navigate(path: string): void {
        window.location.href = `${window.location.href.replace(/#(.*)$/, '')}#${path}`;
    }

    public listen(): void {
        if (this.intervalTimer) {
            clearInterval(this.intervalTimer);
        }
        this.intervalTimer = setInterval(this.interval.bind(this), 50);
    }

    public interval(): void {
        console.log('1:', this.current, '2:', this.getFragment());
        if (this.current === this.getFragment()) return;
        this.current = this.getFragment();

        this.routes.some((route) => {
            const match = this.current.match(route.path);

            if (match) {
                match.shift();
                route.calback.apply({}, [...match] as []);
                return match;
            }
            return false;
        });
    }
}
