import './App.css';
import {useEffect, useState} from "react";
import Warning from "./components/warning/Warning";
import Input from "./components/input/Input";
import Messages from "./components/messages/Messages";
import {roomName, channelId} from "./utils/constants";

// function randomName() {
//     const adjectives = ["autumn", "hidden", "bitter", "misty", "silent", "empty", "dry", "dark", "summer", "icy", "delicate", "quiet", "white", "cool", "spring", "winter", "patient", "twilight", "dawn", "crimson", "wispy", "weathered", "blue", "billowing", "broken", "cold", "damp", "falling", "frosty", "green", "long", "late", "lingering", "bold", "little", "morning", "muddy", "old", "red", "rough", "still", "small", "sparkling", "throbbing", "shy", "wandering", "withered", "wild", "black", "young", "holy", "solitary", "fragrant", "aged", "snowy", "proud", "floral", "restless", "divine", "polished", "ancient", "purple", "lively", "nameless"];
//     const nouns = ["waterfall", "river", "breeze", "moon", "rain", "wind", "sea", "morning", "snow", "lake", "sunset", "pine", "shadow", "leaf", "dawn", "glitter", "forest", "hill", "cloud", "meadow", "sun", "glade", "bird", "brook", "butterfly", "bush", "dew", "dust", "field", "fire", "flower", "firefly", "feather", "grass", "haze", "mountain", "night", "pond", "darkness", "snowflake", "silence", "sound", "sky", "shape", "surf", "thunder", "violet", "water", "wildflower", "wave", "water", "resonance", "sun", "wood", "dream", "cherry", "tree", "fog", "frost", "voice", "paper", "frog", "smoke", "star"];
//     const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
//     const noun = nouns[Math.floor(Math.random() * nouns.length)];
//     return adjective + noun;
// }

function randomName() {
    const names = require('starwars-names');

    return names.random();
}

function randomColor() {
    return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
}

function App() {

    const [member, setMember] = useState({id: null, name: randomName(), color: randomColor()});
    const [messages, setMessages] = useState([]);
    const [lastMessage, setLastMessage] = useState({text: ''});
    const [drone, setDrone] = useState(null);
    const [showInputWarning, setShowInputWarning] = useState(false);

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
            data.sender.id = sender.id;

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
        setShowInputWarning(false);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (lastMessage.text.trim().length > 0) {
            setLastMessage({sender: member, text: ''});
            handleSendMessage(lastMessage);
        } else {
            setShowInputWarning(true);
        }
    }

    const scrollToBottom = () => {

        const lastElementId = "scroll-to-" + (messages.length - 1);
        const element = document.getElementById(lastElementId);

        if (element) {
            element.scrollIntoView({behavior: 'smooth'});
        }
    }

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <div className="app">
            <div className="app-header">
                <h3>Chatting made simple</h3>
            </div>
            <div className="content-holder">
                <Messages
                    messages={messages}
                    member={member}
                />
                <Input
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    lastMessage={lastMessage}
                />
                <Warning showInputWarning={showInputWarning}/>
            </div>
        </div>
    );
}

export default App;
