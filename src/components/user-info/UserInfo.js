import './style.css';

const UserInfo = ({message, previousMessage, userType}) => {

    return <div className="user-info" style={{
        justifyContent: userType === 'sender' ? 'end' : 'start'
    }}>
        {previousMessage && previousMessage.sender.id === message.sender.id ?
            <></>
            : <>
                <span className="avatar" style={{
                    backgroundColor: message.sender.color
                }}/>
                <div className="username">
                    {message.sender.name}
                </div>
            </>
        }
    </div>;

}

export default UserInfo;