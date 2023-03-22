import './App.css';
import {useEffect, useState} from "react";

function randomName() {
    const adjectives = ["autumn", "hidden", "bitter", "misty", "silent", "empty", "dry", "dark", "summer", "icy", "delicate", "quiet", "white", "cool", "spring", "winter", "patient", "twilight", "dawn", "crimson", "wispy", "weathered", "blue", "billowing", "broken", "cold", "damp", "falling", "frosty", "green", "long", "late", "lingering", "bold", "little", "morning", "muddy", "old", "red", "rough", "still", "small", "sparkling", "throbbing", "shy", "wandering", "withered", "wild", "black", "young", "holy", "solitary", "fragrant", "aged", "snowy", "proud", "floral", "restless", "divine", "polished", "ancient", "purple", "lively", "nameless"];
    const nouns = ["waterfall", "river", "breeze", "moon", "rain", "wind", "sea", "morning", "snow", "lake", "sunset", "pine", "shadow", "leaf", "dawn", "glitter", "forest", "hill", "cloud", "meadow", "sun", "glade", "bird", "brook", "butterfly", "bush", "dew", "dust", "field", "fire", "flower", "firefly", "feather", "grass", "haze", "mountain", "night", "pond", "darkness", "snowflake", "silence", "sound", "sky", "shape", "surf", "thunder", "violet", "water", "wildflower", "wave", "water", "resonance", "sun", "wood", "dream", "cherry", "tree", "fog", "frost", "voice", "paper", "frog", "smoke", "star"];
    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    return adjective + noun;
}

function randomColor() {
    return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
}

function App() {

    const roomName = 'observable-room';
    const channelId = 'datcsAXcI32EjTGo';

    const [member, setMember] = useState({id: null, name: randomName(), color: randomColor()});
    const [messages, setMessages] = useState([]);
    const [lastMessage, setLastMessage] = useState({text: ''});
    const [drone, setDrone] = useState(null);

    useEffect(() => {
        console.log('Who am I?', member);

        const drone = new window.Scaledrone(channelId, {
            data: member
        });

        drone.on('open', (error) => {
            if (error) {
                return console.error(error);
            }

            console.log('What\'s my id?', drone.clientId);

            member.id = drone.clientId;

            setMember(member);
        });

        const room = drone.subscribe(roomName);

        room.on('data', (data, sender) => {
            data.sender = sender.clientData;

            setMessages(messages => [...messages, data]);
        });

        setDrone(drone);
    }, []);

    const handleSendMessage = (message) => {
        drone.publish({
            room: roomName,
            message
        });
    }

    const handleChange = (e) => {
        setLastMessage({text: e.target.value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        setLastMessage({text: ''});
        handleSendMessage(lastMessage);
    }

    return (
        <div className="App">
            <div className="App-header" style={{minHeight: '200px'}}>
                <h1>My Chat App</h1>
            </div>

            <ul className="Messages-list">
                {messages.map((message, index) => {
                    return <li key={index} className={member.id === message.sender.id ? 'sender' : 'receiver'}>
                        <span className="avatar" style={{backgroundColor: message.sender.color}}/>
                        <div className="Message-content">
                            <div className="username">
                                {message.sender.name}
                            </div>
                            <div className="text">{message.text}</div>
                        </div>
                    </li>
                })}
            </ul>

            <div className="Input">
                <form onSubmit={e => handleSubmit(e)}>
                    <input
                        onChange={e => handleChange(e)}
                        value={lastMessage.text}
                        type="text"
                        placeholder="Press ENTER to send"
                        autoFocus={true}
                    />
                    <button>Send</button>
                </form>
            </div>

        </div>
    );
}

export default App;
