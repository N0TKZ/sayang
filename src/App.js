//edit test
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css'; // Import the CSS file

export default function Page() {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const [deviceType, setDeviceType] = useState('');
  const [ipAddress, setIpAddress] = useState('');

  const yesButtonSize = noCount * 20 + 16;

  const handleNoClick = () => {
    setNoCount(noCount + 1);
    sendMessageToTelegramBot('No');
  };

  const handleYesClick = () => {
    setYesPressed(true);
    sendMessageToTelegramBot('Yes');
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

  const sendMessageToTelegramBot = async (answer) => {
    const botToken = '6751658476:AAH17_DhTGmOHb3DHjFRe5L-AeEc8ryfcUY';
    const chatId = '818897776';
    const now = new Date();
    const dateTime = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
    const message = `Someone answered "${answer}" to "Will you be mine?"\nDevice Type: ${getDeviceType()}\nDate/Time: ${dateTime}\nIP Address: ${ipAddress}`;

    try {
      await axios.post(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        chat_id: chatId,
        text: message
      });
      console.log('Message sent successfully');
    } catch (error) {
      console.error('Error sending message to Telegram bot:', error);
    }
  };

  useEffect(() => {
    // Fetch user IP address when component mounts
    axios.get('https://api.ipify.org?format=json')
      .then(response => {
        setIpAddress(response.data.ip);
      })
      .catch(error => {
        console.error('Error fetching IP address:', error);
      });
  }, []);

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
