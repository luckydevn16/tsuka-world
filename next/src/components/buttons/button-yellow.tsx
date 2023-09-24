interface Props {
    text: string;
    className?: string;
}

const ButtonYellow: React.FC<Props> = ({text, className}) => {
    return (
        <div className={`py-3 text-center font-hylia text-xl text-hover ` + className}>
            <button className="rounded-full bg-normal py-2 px-5">
                {text}
            </button>
        </div>
    )
}

export default ButtonYellow