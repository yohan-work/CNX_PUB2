

export class Brand {
    name : string;
    since : number;
    employee : number;
    constructor(name : string, since : number, employee:number) {
        this.name = name;
        this.since = since;
        this.employee = employee;
    }
    
    // constructor(
    //     public name : string,
    //     public since : number,
    //     public employee : number
    // ){}
}

export class Samsung extends Brand {
    location : string;
    constructor(name : string, since : number, employee:number, location: string) {
        super(name, since, employee);
        
        this.location = location
    }

    // constructor(
    //     public name : string,
    //     public since : number,
    //     public employee:number,
    //     public location: string) {
    //     super(name, since, employee);
    // }

    getInfomation() {
        return `name : ${this.name}\nsince : ${this.since}, \nemployee : ${this.employee}, \nlocation : ${this.location}`
    }
}


