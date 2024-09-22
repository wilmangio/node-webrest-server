"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTodoDto = void 0;
class UpdateTodoDto {
    constructor(id, text, createdAt) {
        this.id = id;
        this.text = text;
        this.createdAt = createdAt;
    }
    get values() {
        const returnObj = {};
        if (this.text)
            returnObj.text = this.text;
        if (this.createdAt)
            returnObj.createdAt = this.createdAt;
        return returnObj;
    }
    static create(props) {
        const { id, text, createdAt } = props;
        let newDaten = createdAt;
        if (!id || isNaN(Number(id)))
            return ['numero no enviado'];
        if (createdAt) {
            newDaten = new Date(createdAt);
            if (newDaten.toString() === 'Invalid Date') {
                return ['Invalid Date', undefined];
            }
        }
        return [undefined, new UpdateTodoDto(id, text, newDaten)];
    }
}
exports.UpdateTodoDto = UpdateTodoDto;
