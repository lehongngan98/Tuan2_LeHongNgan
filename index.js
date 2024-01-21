"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Main = exports.vehicle = void 0;
var readline_1 = require("readline"); // Import for user input
var vehicle = /** @class */ (function () {
    function vehicle(owner, type, value, cylinderCapacity) {
        this.owner = owner;
        this.type = type;
        this.setValue(value);
        this.setCylinderCapacity(cylinderCapacity);
    }
    vehicle.prototype.getOwner = function () {
        return this.owner;
    };
    vehicle.prototype.setOwner = function (owner) {
        if (owner.length > 0) {
            this.owner = owner;
        }
        else {
        }
        this.owner = owner;
    };
    vehicle.prototype.getType = function () {
        return this.type;
    };
    vehicle.prototype.setType = function (type) {
        this.type = type;
    };
    vehicle.prototype.getValue = function () {
        return this.value;
    };
    vehicle.prototype.setValue = function (value) {
        if (value >= 0) {
            this.value = value;
        }
        else {
            throw new Error("Trị giá xe phải lớn hơn hoặc bằng 0");
        }
    };
    vehicle.prototype.getCylinderCapacity = function () {
        return this.cylinderCapacity;
    };
    vehicle.prototype.setCylinderCapacity = function (cylinderCapacity) {
        if (cylinderCapacity >= 0) {
            this.cylinderCapacity = cylinderCapacity;
        }
        else {
            throw new Error("Dung tích xylanh phải lớn hơn hoặc bằng 0");
        }
    };
    vehicle.prototype.calculate = function () {
        if (this.cylinderCapacity < 100) {
            return 0.01 * this.value;
        }
        else if (this.cylinderCapacity >= 100 && this.cylinderCapacity <= 200) {
            return 0.03 * this.value;
        }
        else {
            return 0.05 * this.value;
        }
    };
    return vehicle;
}());
exports.vehicle = vehicle;
var Main = /** @class */ (function () {
    function Main() {
    }
    Main.main = function () {
        var _this = this;
        var rl = (0, readline_1.createInterface)({
            input: process.stdin,
            output: process.stdout,
        });
        rl.question('Nhập số lượng xe: ', function (numberOfVehiclesStr) {
            var numberOfVehicles = Number(numberOfVehiclesStr);
            if (isNaN(numberOfVehicles) || numberOfVehicles <= 0) {
                console.error('Số lượng xe phải là số nguyên dương.');
                return;
            }
            var vehicles = [];
            var _loop_1 = function (i) {
                rl.question("Nh\u1EADp th\u00F4ng tin xe th\u1EE9 ".concat(i + 1, " (ch\u1EE7 xe, lo\u1EA1i xe, gi\u00E1 tr\u1ECB, dung t\u00EDch): "), function (vehicleInfoStr) {
                    var _a = vehicleInfoStr.split(','), owner = _a[0], type = _a[1], valueStr = _a[2], cylinderCapacityStr = _a[3];
                    var value = Number(valueStr);
                    var cylinderCapacity = Number(cylinderCapacityStr);
                    try {
                        vehicles.push(new vehicle(owner, type, value, cylinderCapacity));
                    }
                    catch (error) {
                        console.error(error.message);
                        i--; // Decrement counter to repeat input for invalid vehicle
                    }
                    if (i === numberOfVehicles - 1) {
                        rl.close();
                        _this.displayVehicleTable(vehicles);
                    }
                });
                out_i_1 = i;
            };
            var out_i_1;
            for (var i = 0; i < numberOfVehicles; i++) {
                _loop_1(i);
                i = out_i_1;
            }
        });
    };
    Main.displayVehicleTable = function (vehicles) {
        var _this = this;
        // Print table header
        console.log("Bảng kê khai tiền thuế trước bạ:");
        console.log("--------------------------------------------------------------------------------------------------");
        console.log("Tên Chủ xe\t\tLoại xe\t\tDung tích\t\tGiá trị\t\tThuế phải nộp");
        console.log("--------------------------------------------------------------------------------------------------");
        // Loop through each vehicle and display its information
        vehicles.forEach(function (vehicle) {
            _this.displayVehicleInfo(vehicle); // Call displayVehicleInfo for each vehicle
        });
    };
    Main.displayVehicleInfo = function (vehicle) {
        var tax = vehicle.calculate();
        console.log("".concat(vehicle.getOwner(), "\t\t").concat(vehicle.getType(), "\t\t").concat(vehicle.getValue(), "\t\t\t").concat(vehicle.getCylinderCapacity(), "\t\t\t").concat(tax));
    };
    return Main;
}());
exports.Main = Main;
Main.main();
