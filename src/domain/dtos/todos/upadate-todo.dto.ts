

export class UpdateTodoDto{

    private constructor(
        public readonly id:number,
        public readonly text?:string,
        public readonly createdAt?:Date,
    ){}

    get values(){
        const returnObj: {[key:string]:any} = {};
        if(this.text) returnObj.text = this.text;
        if(this.createdAt) returnObj.createdAt = this.createdAt;

        return returnObj;
    }

    static create(props: {[key:string]:any}): [string?, UpdateTodoDto?]{
        const { id, text, createdAt } = props;
        let newDaten = createdAt;

        if(!id || isNaN(Number(id))) return ['numero no enviado'];

        if(createdAt){
            newDaten = new Date(createdAt);
            if(newDaten.toString() === 'Invalid Date'){
                return [ 'Invalid Date', undefined];
            }
        }


        return [undefined, new UpdateTodoDto( id, text, newDaten)];
    }
}