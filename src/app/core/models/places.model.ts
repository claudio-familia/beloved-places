export class Place {
    id: number;
    name: string;
    description: string;
    address: string;
    location: string;
    like: number;


    constructor() {
        this.id = 0;
        this.name = '';
        this.description = '';
        this.address = '';
        this.location = '';
        this.like = 0;
    }
}
