import React, { Component, useEffect, useState } from 'react';
import Spinner from 'react-spinner';
import classNames from 'classnames';
import OT from '@opentok/client';

import AccCore from 'opentok-accelerator-core';




const apiKeyTest = "47684721";
const sessionIdTest = "2_MX40NzY4NDcyMX5-MTY3OTk5Nzg5ODI5OH5BTkd0bW5FSlNBMWVya2dMdVplVzU3dlV-fn4";
const tokenTest = "T1==cGFydG5lcl9pZD00NzY4NDcyMSZzaWc9ZTM4YWMyZDJiZTIwYTNmZjhmMmYyZjM5ODVkNDEyZDEyMzA2NmEwMjpzZXNzaW9uX2lkPTJfTVg0ME56WTRORGN5TVg1LU1UWTNPVGs1TnpnNU9ESTVPSDVCVGtkMGJXNUZTbE5CTVdWeWEyZE1kVnBsVnpVM2RsVi1mbjQmY3JlYXRlX3RpbWU9MTY3OTk5NzkzMyZub25jZT0wLjg5MTA1NzE2Njc3MjUxNzEmcm9sZT1wdWJsaXNoZXImZXhwaXJlX3RpbWU9MTY4MjU4OTkzMSZpbml0aWFsX2xheW91dF9jbGFzc19saXN0PQ==";

const OpenTok = require("opentok");

const otCoreOptions = {
  credentials: {
    apiKey: apiKeyTest,
    sessionId: sessionIdTest,
    token: tokenTest,
  },
  // A container can either be a query selector or an HTML Element
  streamContainers(pubSub, type, data, stream) {
    return {
      publisher: {
        camera: '#cameraPublisherContainer',
        screen: '#screenPublisherContainer',
      },
      subscriber: {
        camera: '#cameraSubscriberContainer',
        screen: '#screenSubscriberContainer',
      },
    }[pubSub][type];
  },
  controlsContainer: '#controls',
  packages: ['textChat', 'screenSharing', 'annotation'],
  communication: {
    callProperties: null, // Using default
  },
  textChat: {
    name: ['David', 'Paul', 'Emma', 'George', 'Amanda'][Math.random() * 5 | 0], // eslint-disable-line no-bitwise
    waitingMessage: 'Messages will be delivered when other users arrive',
    container: '#chat',
  },
  screenSharing: {
    extensionID: 'plocfffmbcclpdifaikiikgplfnepkpo',
    annotation: true,
    externalWindow: false,
    dev: true,
    screenProperties: {
      insertMode: 'append',
      width: '100%',
      height: '100%',
      showControls: false,
      style: {
        buttonDisplayMode: 'off',
      },
      videoSource: 'window',
      fitMode: 'contain' // Using default
    },
  },
  annotation: {
    absoluteParent: {
      publisher: '.App-video-container',
      subscriber: '.App-video-container'
    }
  },
};

/**
 * Build classes for container elements based on state
 * @param {Object} state
 */
const getContainerClasses = ({ localAudioEnabled, localVideoEnabled, connected, active, meta }) => {
  const sharingScreen = meta ? !!meta.publisher.screen : false;
  const viewingSharedScreen = meta ? meta.subscriber.screen : false;
  const activeCameraSubscribers = meta ? meta.subscriber.camera : 0;
  const activeCameraSubscribersGt2 = activeCameraSubscribers > 2;
  const activeCameraSubscribersOdd = activeCameraSubscribers % 2;
  const screenshareActive = viewingSharedScreen || sharingScreen;
  return {
    controlClass: classNames('App-control-container', { hidden: !active }),
    localAudioClass: classNames('ots-video-control circle audio', { hidden: !active, muted: !localAudioEnabled }),
    localVideoClass: classNames('ots-video-control circle video', { hidden: !active, muted: !localVideoEnabled }),
    localCallClass: classNames('ots-video-control circle end-call', { hidden: !active }),
    cameraPublisherClass: classNames('video-container', { hidden: !active, small: !!activeCameraSubscribers || screenshareActive, left: screenshareActive }),
    screenPublisherClass: classNames('video-container', { hidden: !active || !sharingScreen }),
    cameraSubscriberClass: classNames('video-container', { hidden: !active || !activeCameraSubscribers },
      { 'active-gt2': activeCameraSubscribersGt2 && !screenshareActive },
      { 'active-odd': activeCameraSubscribersOdd && !screenshareActive },
      { small: screenshareActive }
    ),
    screenSubscriberClass: classNames('video-container', { hidden: !viewingSharedScreen || !active }),
  };
};

OpenTok.connectingMask = () => (
  <div className="App-mask">
    <Spinner />
    <div className="message with-spinner">Connecting</div>
  </div>
);

OpenTok.startCallMask = (start) => (
  <div className="App-mask">
    <button className="message button clickable" onClick={start}>
      Click to Start Call
    </button>
  </div>
);

function VideoChat({audioDevices, videoDevices, apiKey,sessionId,token, roomName, participantName}) {
  const [connected, setConnected] = useState(false);
  const [active, setActive] = useState(false);
  const [publishers, setPublishers] = useState(null);
  const [subscribers, setSubscribers] = useState(null);
  const [meta, setMeta] = useState(null);
  const [localAudioEnabled, setLocalAudioEnabled] = useState(true);
  const [localVideoEnabled, setLocalVideoEnabled] = useState(true);

  

  const startCall = () => {
    const otCoreOptions = {
      credentials: {
        apiKey,
        sessionId,
        token,
      },
      publisher: {
        audioSource: audioDevices[0].deviceId,
        videoSource: videoDevices[0].deviceId
      },
      // more options here
    };
    OpenTok.startCall(otCoreOptions).then(({ publishers, subscribers, meta }) => {
      setPublishers(publishers);
      setSubscribers(subscribers);
      setMeta(meta);
      setActive(true);
    }).catch(error => console.log(error));
  };

  const endCall = () => {
    OpenTok.endCall();
    setActive(false);
  };

  const toggleLocalAudio = () => {
    setLocalAudioEnabled(!localAudioEnabled);
    // Remove this.setState as it is not needed in functional components
  }

  const toggleLocalVideo = () => {
    setLocalVideoEnabled(!localVideoEnabled);
    // Remove this.setState as it is not needed in functional components
  }

  // Remove render method as it is not needed in functional components
  const containerClasses = getContainerClasses({
    localAudioEnabled,
    localVideoEnabled,
    connected,
    active,
    meta,
  });
  
  const {
    localAudioClass,
    localVideoClass,
    localCallClass,
    controlClass,
    cameraPublisherClass,
    screenPublisherClass,
    cameraSubscriberClass,
    screenSubscriberClass,
  } = containerClasses;

  const session = OT.initSession(apiKey, sessionId);

  

  session.disconnect

  
  

  return (
    <div className="ml-20 mt-20 bg-white">
      
      <div className="App-header">
        
      </div>
      <div className="App-main">
        <div className="App-video-container">
          { !connected && OpenTok.connectingMask() }
          { connected && !active && OpenTok.startCallMask(startCall) } {/* pass the startCall function */}
          <div id="cameraPublisherContainer" className={cameraPublisherClass} />
          <div id="screenPublisherContainer" className={screenPublisherClass} />
          <div id="cameraSubscriberContainer" className={cameraSubscriberClass} />
          <div id="screenSubscriberContainer" className={screenSubscriberClass} />
        </div>
        <div id="controls" className={controlClass}>
          <div className={localAudioClass} onClick={toggleLocalAudio} />
          <div className={localVideoClass} onClick={toggleLocalVideo} />
          <div className={localCallClass} onClick={endCall} />
        </div>
        <div id="chat" className="App-chat-container" />
      </div>
    </div>
  );
}

export default VideoChat;