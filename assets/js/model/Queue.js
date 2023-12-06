// classe da fila
export class Queue {
    constructor(maxSize) {
        this.items = [];
        this.maxSize = maxSize;
    }

    // adiciona um item na fila
    enqueue(item) {
        if (this.items.length >= this.maxSize) {
            throw new Error("Queue overflow");
        } else {
            this.items.push(item);
        }
    }

    // remove um item da fila
    dequeue() {
        if (this.isEmpty()) {
            return null;
        } else {
            return this.items.shift();
        }
    }

    // retorna o primeiro item da fila
    isEmpty() {
        return this.items.length === 0;
    }

    // retorna o tamanho da fila
    size() {
        return this.items.length;
    }
}

// Adiciona o método [Symbol.iterator] ao protótipo de Queue para que seja possível percorrer a fila com um for...of
Queue.prototype[Symbol.iterator] = function() {
    let index = 0;
    const items = this.items;

    return {
        next: function() {
            return index < items.length ?
                {value: items[index++], done: false} :
                {done: true};
        }
    };
}

Queue.prototype.size = function() {
    return this.items.length;
};