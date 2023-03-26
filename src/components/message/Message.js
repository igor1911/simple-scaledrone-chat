import './style.css';
import MessageText from "../message-text/MessageText";
import UserInfo from "../user-info/UserInfo";

const Message = ({index, member, message, previousMessage}) => {

    const userType = member.id === message.sender.id ? 'sender' : 'receiver';

    return <div key={index} id={'scroll-to-' + index}
                className={member.id === message.sender.id ? 'sender' : 'receiver'}>
        <div className="message-content-holder">
            <UserInfo message={message} previousMessage={previousMessage} userType={userType}/>
            <MessageText message={message}/>
        </div>
    </div>
}

export default Message;