interface Props {
    label: string
    placeholder: string
    onChange: (e: any) => void
}

const LabeledTextArea: React.FC<Props> = ({label, placeholder, onChange}) => {
    return (
        <div className="w-full flex flex-col gap-2">
            <p>{label}</p>
            <textarea onChange={onChange} className="h-[200px] max-h-[200px] mx-10 p-2 text-white placeholder-white bg-white/0 border-2 border-white/70 rounded-lg scrollable" placeholder={placeholder}></textarea>
        </div>  
    )
}

export default LabeledTextArea