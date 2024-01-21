import { createInterface } from 'readline'; // Import for user input
export class vehicle{
    private owner: string;
    private type: string;
    private value: number;
    private cylinderCapacity: number;

    constructor(owner: string, type: string, value: number, cylinderCapacity: number){
        this.owner = owner;
        this.type = type;
        this.setValue(value);
        this.setCylinderCapacity(cylinderCapacity);
    }

   
    public getOwner(): string{
        return this.owner;
    }

    public setOwner(owner: string): void{
        if(owner.length > 0){
            this.owner = owner;
        }
        else{

        }
        this.owner = owner;
    }

    public getType(): string{
        return this.type;
    }

    public setType(type: string): void{
        this.type = type;
    }

    public getValue(): number{
        return this.value;
    }

    public setValue(value: number): void{
        if(value >= 0){
            this.value = value;
        }
        else{
            throw new Error("Trị giá xe phải lớn hơn hoặc bằng 0");
        }
    }

    public getCylinderCapacity(): number{
        return this.cylinderCapacity;
    }

    public setCylinderCapacity(cylinderCapacity: number): void{
        if(cylinderCapacity >= 0){
            this.cylinderCapacity = cylinderCapacity;            
        }
        else{
            throw new Error("Dung tích xylanh phải lớn hơn hoặc bằng 0");
        }
        
    }

    calculate(): number {
        if (this.cylinderCapacity < 100) {
            return 0.01 * this.value;
        } else if (this.cylinderCapacity >= 100 && this.cylinderCapacity <= 200) {
            return 0.03 * this.value;
        } else {
            return 0.05 * this.value;
        }
    }
    
}

export class Main{
    public static main(): void {
        const rl = createInterface({
          input: process.stdin,
          output: process.stdout,
        });
    
        rl.question('Nhập số lượng xe: ', (numberOfVehiclesStr) => {
          const numberOfVehicles = Number(numberOfVehiclesStr);
          if (isNaN(numberOfVehicles) || numberOfVehicles <= 0) {
            console.error('Số lượng xe phải là số nguyên dương.');
            return;
          }
    
          const vehicles: vehicle[] = [];
          for (let i = 0; i < numberOfVehicles; i++) {
            rl.question(`Nhập thông tin xe thứ ${i + 1} (chủ xe, loại xe, giá trị, dung tích): `, (vehicleInfoStr) => {
              const [owner, type, valueStr, cylinderCapacityStr] = vehicleInfoStr.split(',');
              const value = Number(valueStr);
              const cylinderCapacity = Number(cylinderCapacityStr);
    
              try {
                vehicles.push(new vehicle(owner, type, value, cylinderCapacity));
              } catch (error) {
                console.error(error.message);
                i--; // Decrement counter to repeat input for invalid vehicle
              }
    
              if (i === numberOfVehicles - 1) {
                rl.close();
                this.displayVehicleTable(vehicles);
              }
            });
          }
        });
      }
    
    
    static displayVehicleTable(vehicles: vehicle[]): void {
        // Print table header
        console.log("Bảng kê khai tiền thuế trước bạ:");
        console.log("--------------------------------------------------------------------------------------------------");
        console.log("Tên Chủ xe\t\tLoại xe\t\tDung tích\t\tGiá trị\t\tThuế phải nộp");
        console.log("--------------------------------------------------------------------------------------------------");
    
        // Loop through each vehicle and display its information
        vehicles.forEach(vehicle => {
        this.displayVehicleInfo(vehicle); // Call displayVehicleInfo for each vehicle
        });
  }

    static displayVehicleInfo(vehicle: vehicle): void {
        const tax = vehicle.calculate();
        console.log(`${vehicle.getOwner()}\t\t${vehicle.getType()}\t\t${vehicle.getValue()}\t\t\t${vehicle.getCylinderCapacity()}\t\t\t${tax}`);
    }
}
Main.main();