

export class CreateTodoDto{

    private constructor(
        public readonly text:string,
    ){}

    static create(props: {[key:string]:any}): [string?, CreateTodoDto?]{
        const { text } = props;
        if(!text) return ['texto reuqerido', undefined];

        return [undefined, new CreateTodoDto( text )];
    }
}