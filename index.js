var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import "reflect-metadata";
import { Handler, HandlersContainer, Max, Min, Application } from './event-lib';
let MyHandlers = class MyHandlers {
    constructor() {
        this.text = "MyHandlers => ";
    }
    handleA(a) {
        return this.text + "Handling A: " + a;
    }
    handleB(b) {
        return "Handling B: " + b;
    }
    handleC(c) {
        return "Handling C: " + c;
    }
};
__decorate([
    Handler("A")
], MyHandlers.prototype, "handleA", null);
__decorate([
    Handler("B"),
    __param(0, Min(2)),
    __param(0, Max(4))
], MyHandlers.prototype, "handleB", null);
__decorate([
    Handler("C")
], MyHandlers.prototype, "handleC", null);
MyHandlers = __decorate([
    HandlersContainer("GenericBase")
], MyHandlers);
let TestDecorators = class TestDecorators {
    constructor() {
        this.text = "ASD";
        this.total = 0;
    }
    test(message) {
        return this.text + " " + message;
    }
    sumAcum(num) {
        return this.total += num;
    }
};
__decorate([
    Handler("D")
], TestDecorators.prototype, "test", null);
__decorate([
    Handler("E")
], TestDecorators.prototype, "sumAcum", null);
TestDecorators = __decorate([
    HandlersContainer("TestBase")
], TestDecorators);
const app = new Application();
app.addHandlersContainer(MyHandlers);
app.addHandlersContainer(TestDecorators);
app.handle("GenericBase:A", ["Hello World"]);
app.handle("GenericBase:B", [3]);
app.handle("GenericBase:B", [99]);
app.handle("GenericBase:B", [0]);
app.handle("GenericBase:C", [true]);
app.handle("TestBase:D", ["Hello World 2"]);
app.handle("TestBase:E", [1]);
app.handle("TestBase:E", [2]);
app.handle("TestBase:E", [3]);
