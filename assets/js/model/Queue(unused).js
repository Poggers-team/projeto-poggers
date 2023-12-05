export class Queue {
    constructor() {
        this.elements = [];
    }

    // adiciona um elemento à fila
    enqueue(element) {
        this.elements.push(element);
    }

    // remove e retorna o elemento mais antigo da fila
    dequeue() {
        if (this.isEmpty()) {
            return null; // fila vazia
        }
        return this.elements.shift();
    }

    // verifica se a fila está vazia
    isEmpty() {
        return this.elements.length === 0;
    }

    // retorna o tamanho da fila
    size() {
        return this.elements.length;
    }
}
