import './style.css';
import Message from "../message/Message";

const Messages = ({messages, member}) => {
    return <div className="messages">

        <p style={{
            textAlign: 'center',
            display: messages.length > 0 ? 'none' : 'block'
        }}>Welcome to simple chat!<br/><br/>Once you start typing, your chat message will appear here.<br/><br/> Enjoy!
        </p>

        {messages.map((message, index, array) => {
            const previousMessage = array[index - 1];

            return <Message index={index} message={message} previousMessage={previousMessage} member={member}/>
        })}
    </div>
}

export default Messages;