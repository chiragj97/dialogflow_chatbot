import React from 'react';

const QuickReply = (props) => {
  return (
    <div style={{ display: 'inline', color: 'blue' }}>
      <a
        style={{
          backgroundColor: 'white',
          borderRadius: 10,
          border: 'none',
          fontWeight: 'bold',
          marginTop: 3,
        }}
        className="btn btn-primary"
        onClick={() =>
          props.click(
            props.reply.structValue.fields.payload.stringValue,
            props.reply.structValue.fields.text.stringValue
          )
        }
      >
        {props.reply.structValue.fields.text.stringValue}
      </a>
      &nbsp;&nbsp;&nbsp;
    </div>
  );
};

export default QuickReply;
