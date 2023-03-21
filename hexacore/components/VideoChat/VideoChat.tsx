import OT from "@opentok/client";

// replace these values with those generated in your Video API account
var apiKey = "47684721";
var sessionId = "2_MX40NzY4NDcyMX5-MTY3OTQwMDA1ODg4OH5GVGkrSjFBTnd3RWxaMmZ3NmtNc01SU2N-fn4";
var token = "T1==cGFydG5lcl9pZD00NzY4NDcyMSZzaWc9YTkwNTEzMDdiMDcwMmRhN2YzYWE2MTEzZTdkOWQ0ZWE5OTE2OGFlNjpzZXNzaW9uX2lkPTJfTVg0ME56WTRORGN5TVg1LU1UWTNPVFF3TURBMU9EZzRPSDVHVkdrclNqRkJUbmQzUld4YU1tWjNObXROYzAxU1UyTi1mbjQmY3JlYXRlX3RpbWU9MTY3OTQwMDA2OCZub25jZT0wLjU5MDQ3NjI5NDQwNTEzNTgmcm9sZT1wdWJsaXNoZXImZXhwaXJlX3RpbWU9MTY3OTQyMTY2NiZpbml0aWFsX2xheW91dF9jbGFzc19saXN0PQ==";







const VideoChat = () => {

    function handleError(error) {
        if (error) {
          alert(error.message);
        }
    }
      
      function initializeSession() {
        var session = OT.initSession(apiKey, sessionId);
      
        // Subscribe to a newly created stream
        session.on('streamCreated', function(event) {
            session.subscribe(event.stream, 'subscriber', {
              insertMode: 'append',
              width: '100%',
              height: '100%'
            }, handleError);
          });
          
      
        // Create a publisher
        var publisher = OT.initPublisher('publisher', {
          insertMode: 'append',
          width: '100%',
          height: '100%'
        }, handleError);
      
        // Connect to the session
        session.connect(token, function(error) {
          // If the connection is successful, publish to the session
          if (error) {
            handleError(error);
          } else {
            session.publish(publisher, handleError);
          }
        });
      }
      
    
    // (optional) add server code here
    initializeSession();
    

    return(
        <div className="flex flex-wrap justify-center">
            <div id="publisher" className="w-80 h-full mb-30 p-4"></div>
            <div id="subscriber" className="w-80 h-full p-4"></div>
            
    </div>
    )
}

export default VideoChat