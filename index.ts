import "reflect-metadata";
import { Handler, HandlersContainer, Max, Min, Application } from './event-lib';

@HandlersContainer("GenericBase")
class MyHandlers {
    private text = "MyHandlers => ";

    @Handler("A")
    handleA(a: string) {
        return this.text + "Handling A: " + a;
    }

    @Handler("B")
    handleB(
        @Min(2)
        @Max(4)
        b: number,
    ) {
        return "Handling B: " + b;
    }

    @Handler("C")
    handleC(c: boolean) {
        return "Handling C: " + c;
    }
}

@HandlersContainer("TestBase")
class TestDecorators {
    private text = "ASD";
    private total = 0;

    @Handler("D")
    test(message) {
        return this.text + " " + message;
    }

    @Handler("E")
    sumAcum(num) {
        return this.total += num;
    }
}

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