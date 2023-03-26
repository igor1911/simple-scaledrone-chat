import './style.css';

const Input = ({handleSubmit, handleChange, lastMessage}) => {
    return <>
        <div className="input">
            <form onSubmit={e => handleSubmit(e)}>
                <input
                    title="test"
                    onChange={e => handleChange(e)}
                    value={lastMessage.text}
                    type="text"
                    placeholder="Press ENTER to send"
                    autoFocus={true}
                />
                <button>Send</button>
            </form>
        </div>
    </>
}

export default Input;