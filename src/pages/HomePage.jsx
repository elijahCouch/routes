import React from 'react';
import { Link } from 'react-router-dom';
import './homepage.css'; // Import your CSS file

function HomePage() {
  return (
    <div>
      <h1>Hello, everyone!</h1>
      <p>
        Learn about Bitcoin and try out my timing trader app to time when the next time Bitcoin drops!
      </p>
      <h2>Origin and Whitepaper</h2>
      <p>
        In 2008, an individual or group using the pseudonym Satoshi Nakamoto released
        a whitepaper titled "Bitcoin: A Peer-to-Peer Electronic Cash System." This
        document outlined the concept of a decentralized, trustless, and peer-to-peer
        digital currency that would eliminate the need for intermediaries like banks.
        The first Bitcoin transaction took place in January 2009 when Nakamoto mined
        the genesis block of the Bitcoin blockchain, known as Block 0.
      </p>
      <h1>Want to learn more? Click here</h1>
      <Link to="/bitcoin">
        <button>Bitcoin</button>
      </Link>
    </div>
  );
}

export default HomePage;
