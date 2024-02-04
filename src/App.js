import React, { useState } from 'react';
import axios from 'axios';
import './styles.css'; // Import the CSS file

export default function Page() {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const [deviceType, setDeviceType] = useState('');

  const yesButtonSize = noCount * 20 + 16;

  const handleNoClick = () => {
    setNoCount(noCount + 1);
    sendMessageToWebhook('No');
  };

  const handleYesClick = () => {
    setYesPressed(true);
    sendMessageToWebhook('Yes');
  };

  const getDeviceType = () => {
    // Example logic to determine device type
    const userAgent = navigator.userAgent;
    if (/Android/i.test(userAgent)) {
      return 'Android';
    } else if (/iPhone|iPad|iPod/i.test(userAgent)) {
      return 'iOS';
    } else {
      return 'Unknown';
    }
  };

  const getNoButtonText = () => {
    const phrases = [
      "No",
      "Are you sure?",
      "Really sure?",
      "Think again!",
      "Last chance!",
      "Surely not?",
      "You might regret this!",
      "Give it another thought!",
      "Are you absolutely certain?",
      "This could be a mistake!",
      "Have a heart!",
      "Don't be so cold!",
      "Change of heart?",
      "Wouldn't you reconsider?",
      "Is that your final answer?",
      "You're breaking my heart ;(",
    ];

    return phrases[Math.min(noCount, phrases.length - 1)];
  };

  const sendMessageToWebhook = async (answer) => {
    const webhookUrl = 'https://discord.com/api/webhooks/1203358083829600366/J5P9c2ieUJARNXamuENc8LGC7zifyu9VG41X-6OmynrBfGjFjGKnPcHE8KnN1iItfHDp';
    try {
      const deviceType = getDeviceType();
      setDeviceType(deviceType);

      await axios.post(webhookUrl, {
        content: `Someone answered "${answer}" to "Will you be mine?"\n \nDevice Type: ${deviceType}`
      });
      console.log('Message sent successfully');
    } catch (error) {
      console.error('Error sending message to webhook:', error);
    }
  };

  return (
    <div className="container">
      {yesPressed ? (
        <>
          <img src="https://media.tenor.com/gUiu1zyxfzYAAAAi/bear-kiss-bear-kisses.gif" alt="Kiss bear" />
          <div className="text-4xl font-bold my-4">YEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE</div>
        </>
      ) : (
        <>
          <img className="h-[200px]" src="https://gifdb.com/images/high/cute-love-bear-roses-ou7zho5oosxnpo6k.gif" alt="Love bear" />
          <h1 className="text-4xl my-4">Will you be mine?</h1>
          <div>
            <button
              className={`button yes-button`}
              style={{ fontSize: yesButtonSize }}
              onClick={handleYesClick}
            >
              Yes
            </button>
            <button
              onClick={handleNoClick}
              className="button no-button"
            >
              {noCount === 0 ? "No" : getNoButtonText()}
            </button>
          </div>
        </>
      )}
    </div>
  );
}