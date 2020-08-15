import React from 'react';

const Message = (props) => (
  <div
    style={{
      padding: '10px 0px 0px 0px',
    }}
  >
    {props.speaks === 'bot' ? (
      <div
        style={{
          display: 'flex',
          justifyContent: 'left',
        }}
      >
        <div
          style={{
            width: 'auto',
            maxWidth: '80%',
            color: 'black',
            background: 'lightblue',
            borderRadius: 10,
            padding: '10px ',
            // marginBottom: 10,
          }}
        >
          {props.dataLoaded ? <div>{props.text}</div> : <div>t</div>}
        </div>
      </div>
    ) : (
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <div
          style={{
            width: 'auto',
            maxWidth: '80%',
            color: '#fff',
            background: 'darkblue',
            borderRadius: 10,
            padding: '9px ',
            marginBottom: 10,
          }}
        >
          {props.text}
        </div>
      </div>
    )}
  </div>
);

export default Message;
