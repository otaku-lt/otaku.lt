import React from 'react';

interface EventContentProps {
  title: string;
}

export const EventContent: React.FC<EventContentProps> = ({ title }) => {
  return (
    <div className="fc-event-main-frame" style={{ height: '100%' }}>
      <div 
        className="fc-event-title-container" 
        style={{ 
          display: 'flex',
          alignItems: 'center',
          height: '100%',
          padding: '2px 4px',
          overflow: 'hidden'
        }}
      >
        <div 
          className="fc-event-title fc-sticky" 
          style={{
            whiteSpace: 'normal',
            wordBreak: 'break-word',
            lineHeight: '1.2',
            fontSize: '0.75rem',
            fontWeight: 600,
            width: '100%',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {title}
        </div>
      </div>
    </div>
  );
};
