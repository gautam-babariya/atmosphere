import React, { useEffect, useRef, useState } from 'react'
import './Sellingpage.css'
import Navbar from '../../Components/Navbar/Navbar'
import Heroimg from '../../Components/Heroimg/Heroimg';
import Category from '../../Components/Category/Category';
import Heroimg2 from '../../Components/Heroimg2/Heroimg2';
import Footer from '../../Components/Footer/Footer';
import Randompro from '../../Components/Randompro/Randompro';
import Loader from '../../Subcomponents/Loader/Loader';


function Sellingpage() {
  const [isLoggedIn, setIsLoggedIn] = useState(1);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    // Simulate a loading process
    const timer = setTimeout(() => {
      setLoading(false);

    }, 100);

    return () => clearTimeout(timer);
  }, []);
  const playerRef = useRef(null);
  const [player, setPlayer] = useState(null);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      window.onYouTubeIframeAPIReady = () => initPlayer();
      document.body.appendChild(tag);
    } else {
      initPlayer();
    }
  }, []);

  const initPlayer = () => {
    const ytPlayer = new window.YT.Player(playerRef.current, {
      videoId: "V-0ayBCmB_A",
      events: {
        onReady: (event) => {
          setPlayer(event.target);
          event.target.mute();     // Start muted
          event.target.playVideo(); // Auto play
        },
      },
      playerVars: {
        autoplay: 1,
        mute: 1,
        controls: 0,
        modestbranding: 1,
        rel: 0,
        showinfo: 0,
        fs: 0,
      },
    });
  };

  const toggleMute = () => {
    if (player) {
      if (muted) {
        player.unMute();
        setMuted(false);
      } else {
        player.mute();
        setMuted(true);
      }
    }
  };
  return (
    <div>
      {loading ? <Loader name="Welcome to Atmosphere" /> :
        <div id='selling-page'>
          <Navbar Login={isLoggedIn} />
          <div className="video-wrapper">
            <div ref={playerRef} className="yt-iframe"></div>
            <div className="controls">
              {/* <button onClick={() => player?.playVideo()}>Play</button>
              <button onClick={() => player?.pauseVideo()}>Pause</button> */}
              <button onClick={toggleMute}>{muted ? "🔇" : "🔊"}</button>
            </div>
          </div>
          <div id='selling-page-content'>
            <Heroimg />
            <Category />
            <Randompro />
            <Heroimg2 />
            <Randompro />
          </div>
          <Footer />
        </div>
      }
    </div>
  )
}

export default Sellingpage
