import "reflect-metadata";

// Decorador de métodos: Sobreescribe el valor "value" en el PropertyDescriptor
// Decorador de propiedades: Sobreescribe el valor getter/setter en el PropertyDescriptor
// Decorador de clases: Sobreescribe constructor
// Decorador de parámetros: Define metadatos, no modifica la funcionalidad


//Method decorator
function log(): MethodDecorator {
    return function (target: any, key: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = function (...args: any[]) {
            let a = args.map(a => JSON.stringify(a)).join();
            let result = originalMethod.apply(this, args);
            let r = JSON.stringify(result);
            console.log(`Calling: ${key}(${a}) => ${r}`);
            return result;
        }
    }
}

//Property decorator
function title(type: string): PropertyDecorator {
    return function (target: any, key: string) {
        // property value
        let _val;

        // property getter
        let getter = function () {
            return _val;
        };

        // property setter
        let setter = function (newVal) {
            _val = type + ". " + newVal;
        };

        // Create new property with getter and setter
        Object.defineProperty(target, key, {
            get: getter,
            set: setter,
        });
    }
}

// Class decorator
function reLogger(): ClassDecorator {
    return function (constructor: any) {
        // the new constructor behaviour
        const f: any = function (...args) {
            console.log("New: " + constructor.name);
            return new constructor(...args);
        }

        // copy prototype so intanceof operator still works
        f.prototype = constructor.prototype;

        // return new constructor (will override original)
        return f;
    }
}

// Parameter decorator
function logType(): ParameterDecorator {
    return function (target : any, key : string) {
        let types = Reflect.getMetadata("design:paramtypes", target, key);
        let s = types.map(a => a.name).join();
        console.log(`${key} param types: ${s}`);
    }
}

@reLogger()
class C {
    constructor(b) {
        console.log("A("+b+")");
    }

    @title("Mr")
    name: string;

    @log()
    foo(n: number) {
        return n * 2;
    }

    anyType(
        @logType()
            type: any
    ) {
        console.log(type);
    }
}

const a = new C(5);
a.foo(3);

a.name = "Diego";

console.log(a.name);

a.anyType("Test");
a.anyType(3);
a.anyType(Infinity);