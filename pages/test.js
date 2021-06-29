/* eslint-disable @next/next/no-document-import-in-page */
import Document from 'next/document'
import styles from '../styles/Home.module.css'

class MyDocument extends Document {
    render() {
      return (
        <html>
            <head>
                <script src="https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils@0.1/camera_utils.js" crossorigin="anonymous"></script>
                <script src="https://cdn.jsdelivr.net/npm/@mediapipe/control_utils@0.1/control_utils.js" crossorigin="anonymous"></script>
                <script src="https://cdn.jsdelivr.net/npm/@mediapipe/drawing_utils@0.2/drawing_utils.js" crossorigin="anonymous"></script>
                <script src="https://cdn.jsdelivr.net/npm/@mediapipe/pose@0.2/pose.js" crossorigin="anonymous"></script>
            </head>
            
            <body>

                {/* <!-- BULMA NAVBAR --> */}
                <nav className="navbar" role="navigation" aria-label="main navigation"></nav>

                {/* <!-- CONTENTS -->  */}
                <div className="container" style="margin-top: 20px;">

                    <div className="columns">
                    
                    {/* <!-- WEBCAM INPUT -->
                    <!-- <div class="column">
                        <article class="panel is-info">
                        <p class="panel-heading">
                            Webcam Input
                        </p>
                        <div class="panel-block">
                            <video class="input_video5"></video>
                        </div>
                        </article>
                    </div> --> */}

                    {/* <!-- MEDIAPIPE OUTPUT --> */}
                    <div className="column">
                        <article className="panel is-info">
                        <p className="panel-heading">
                            Mediapipe Pose Detection
                        </p>
                        <div className="panel-block">
                            <video hidden className="input_video5"></video>
                            <canvas className="output5" width="720px" height="720px"></canvas>
                        </div>
                        </article>
                    </div>
                    </div>
                    
                    <div className="loading">
                        <div className="spinner"></div>
                    </div>
                    <div style="visibility: hidden;" className="control5"></div>
                </div>

                {/* <script type="text/javascript" src="./pose_est.js"></script> */}
            </body>
        </html>
      )
    }
  }
  
  export default MyDocument