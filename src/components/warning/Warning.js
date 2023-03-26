import './style.css';

const Warning = ({showInputWarning}) => {
    return <>
    <span style={{
        display: showInputWarning ? 'block' : 'none'
    }}>You can not send an empty message!</span></>
}

export default Warning;