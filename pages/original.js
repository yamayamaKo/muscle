import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Original() {

  return (
    <div className={styles.container}>
      <Head>
        <title>筋肉</title>
        <meta charset="utf-8"/>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.2/css/bulma.min.css"/>
        <script src="https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js" crossOrigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/@mediapipe/control_utils/control_utils.js" crossOrigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/@mediapipe/drawing_utils/drawing_utils.js" crossOrigin="anonymous"></script> 
        <script src="https://cdn.jsdelivr.net/npm/@mediapipe/pose/pose.js" crossOrigin="anonymous"></script>
      </Head>
    
        <main>

            {/* BULMA NAVBAR */}
            <nav className="navbar" role="navigation" aria-label="main navigation"/>

            {/* CONTENTS  */}
            <div className="container" style={{marginTop: "20px"}}/>

            <div className="columns">
                
                {/* WEBCAM INPUT */}
                <div className="column">
                <article className="panel is-info">
                    <p className="panel-heading">
                    Webcam Input
                    </p>
                    <div className="panel-block">
                    <video className="input_video5"></video>
                    </div>
                </article>
                </div>

                {/* MEDIAPIPE OUTPUT */}
                <div className="column">
                <article className="panel is-info">
                    <p className="panel-heading">
                    Mediapipe Pose Detection
                    </p>
                    <div className="panel-block">
                    <canvas className="output5" width="480px" height="480px"></canvas>
                    </div>
                </article>
                </div>
            </div>
            
            <div className="loading">
                <div className="spinner"></div>
            </div>
            <div style={{visibility: "hidden"}} className="control5">
            </div>
        </main>

        <script type="text/javascript" src="./pose_est.js"></script>
    </div>
  )
}
