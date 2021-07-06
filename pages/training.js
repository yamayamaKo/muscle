import styles from '../styles/Home.module.css'
import character from '../Assets/img/thin.png'
import React from "react"
import { useEffect } from 'react';

import Image from 'next/image'
// import { hydrate, render } from "react-dom"
// import BrowserRouter from "./routers/Browser"

// import '@mediapipe/pose';
// import '@mediapipe/camera_utils'
// import '@mediapipe/drawing_utils'
// import { ControlPanel, FPS, Slider, StaticText, Toggle } from '@mediapipe/control_utils';
// import { Pose } from '@mediapipe/pose';
// import { Camera } from '@mediapipe/camera_utils';
// import '@mediapipe/pose';
// import * as poseDetection from '@tensorflow-models/pose-detection';

// var count = 0;

export default function Training() {
  useEffect(()=>{
    if (process.browser) {
        const video5 = document.getElementById('input_video5');
        const out5 = document.getElementById('output5')
        const controlsElement5 = document.getElementById('control5');
        const canvasCtx5 = out5.getContext('2d');
        
        console.log(video5);
        const fpsControl = new FPS();
        
        
        var count = 0;
        // var BEND = false;
        // var STRETCH = false;
        var prev = new Date();
        
        const spinner = document.querySelector('.loading');
        spinner.ontransitionend = () => {
          spinner.style.display = 'none';
        };
    
        
        function zColor(data) {
          const z = clamp(data.from.z + 0.5, 0, 1);
          return `rgba(0, ${255 * z}, ${255 * (1 - z)}, 1)`;
        }
        
        function rad_to_deg(radians){
          var pi = Math.PI;
          return radians * (180/pi);
        }
        
        function calc_angle(p1,p2,p3){
          var angle = Math.abs(rad_to_deg(Math.atan2(p3.y-p2.y, p3.x-p2.x) - Math.atan2(p1.y-p2.y, p1.x-p2.x)));
          return Math.round(angle)
        }
        
        function onResultsPose(results) {
          document.body.classList.add('loaded');
          fpsControl.tick();
          var mode = 'pushups';
        
          switch (mode){
            case 'squat':
              var idx1 = 24
              var idx2 = 26
              var idx3 = 28
              var thresh = 60
              var interval = 0.3
              break
            case 'pushups':
              var idx1 = 12
              var idx2 = 14
              var idx3 = 16
              var thresh = 45
              var interval = 0.3
              break
        
            case 'situps':
              var idx1 = 12
              var idx2 = 24
              var idx3 = 26
              var thresh = 130
              var interval = 0.3
              break
        
            case 'backexts':
              var idx1 = 26
              var idx2 = 24
              var idx3 = 12
              var thresh = -190
              var interval = 0.3
              break        
          }
          
          // console.log(mode, idx1, idx2, idx3, thresh, results.poseLandmarks[0]);
          var angle = calc_angle(results.poseLandmarks[idx1],results.poseLandmarks[idx2],results.poseLandmarks[idx3]);
          // console.log(angle);
          var now = new Date();
          now = now.getTime();
          var dt = (now/1000).toFixed(2) - (prev/1000).toFixed(2);
          // console.log(dt);
        
          if(angle < thresh){
            console.log('BEND!');
            if(dt > interval){
              // console.log('++');
              count += 1
              prev = new Date();
              prev = prev.getTime();
            }
          }
          else{
            prev = new Date();
            prev = prev.getTime();
          }
          
          console.log(mode, angle, count);

          canvasCtx5.save();
          canvasCtx5.clearRect(0, 0, out5.width, out5.height);
          canvasCtx5.drawImage(
              results.image, 0, 0, out5.width, out5.height);
          drawConnectors(
              canvasCtx5, results.poseLandmarks, POSE_CONNECTIONS, {
                color: (data) => {
                  const x0 = out5.width * data.from.x;
                  const y0 = out5.height * data.from.y;
                  const x1 = out5.width * data.to.x;
                  const y1 = out5.height * data.to.y;
        
                  const z0 = clamp(data.from.z + 0.5, 0, 1);
                  const z1 = clamp(data.to.z + 0.5, 0, 1);
        
                  const gradient = canvasCtx5.createLinearGradient(x0, y0, x1, y1);
                  gradient.addColorStop(
                      0, `rgba(0, ${255 * z0}, ${255 * (1 - z0)}, 1)`);
                  gradient.addColorStop(
                      1.0, `rgba(0, ${255 * z1}, ${255 * (1 - z1)}, 1)`);
                  return gradient;
                }
              });
          drawLandmarks(
              canvasCtx5,
              Object.values(POSE_LANDMARKS_LEFT)
                  .map(index => results.poseLandmarks[index]),
              {color: zColor, fillColor: '#FF0000'});
          drawLandmarks(
              canvasCtx5,
              Object.values(POSE_LANDMARKS_RIGHT)
                  .map(index => results.poseLandmarks[index]),
              {color: zColor, fillColor: '#00FF00'});
          drawLandmarks(
              canvasCtx5,
              Object.values(POSE_LANDMARKS_NEUTRAL)
                  .map(index => results.poseLandmarks[index]),
              {color: zColor, fillColor: '#AAAAAA'});
        
            canvasCtx5.font = 'bold 50pt sans-serif';
            canvasCtx5.strokeStyle = '#ff0000';
            canvasCtx5.lineWidth = 5;
            canvasCtx5.strokeText(mode, Math.round(out5.width/2)-50, 55);
          
            canvasCtx5.font = 'bold 60pt sans-serif';
            canvasCtx5.strokeStyle = '#00ff00';
            canvasCtx5.lineWidth = 5;
            canvasCtx5.strokeText(angle, 20,80);
            canvasCtx5.strokeText(count, out5.width-100, out5.height-50);
            
            canvasCtx5.font = 'bold 30pt sans-serif';
            canvasCtx5.strokeStyle = '#00ff00';
            canvasCtx5.lineWidth = 3;
            canvasCtx5.strokeText("count: ", out5.width-300, out5.height-50);
            canvasCtx5.strokeText(dt, out5.width-100, 50);
        
          canvasCtx5.restore();
        }
        
        const pose = new Pose({locateFile: (file) => {
          // console.log('a')
          // console.log(typeof file)
          // console.log(file)
          return `https://cdn.jsdelivr.net/npm/@mediapipe/pose@0.2/${file}`;
        },});
        pose.onResults(onResultsPose);
        
        const camera = new Camera(video5, {
          onFrame: async () => {
            await pose.send({image: video5});
          },
          width: 480,
          height: 480
        });
        camera.start();
        
        new ControlPanel(controlsElement5, {
              selfieMode: true,
              upperBodyOnly: false,
              smoothLandmarks: true,
              minDetectionConfidence: 0.5,
              minTrackingConfidence: 0.5
            })
            .add([
              new StaticText({title: 'MediaPipe Pose'}),
              fpsControl,
              new Toggle({title: 'Selfie Mode', field: 'selfieMode'}),
              new Toggle({title: 'Upper-body Only', field: 'upperBodyOnly'}),
              new Toggle({title: 'Smooth Landmarks', field: 'smoothLandmarks'}),
              new Slider({
                title: 'Min Detection Confidence',
                field: 'minDetectionConfidence',
                range: [0, 1],
                step: 0.01
              }),
              new Slider({
                title: 'Min Tracking Confidence',
                field: 'minTrackingConfidence',
                range: [0, 1],
                step: 0.01
              }),
            ])
            .on(options => {
              video5.classList.toggle('selfie', options.selfieMode);
              pose.setOptions(options);
            });
    }},[])
  return (
    <div className={styles.container}>
      <head>
        <title>筋肉</title>
        <meta charSet="utf-8"/>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.2/css/bulma.min.css"/>
        <script src="https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils@0.1/camera_utils.js" crossOrigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/@mediapipe/control_utils@0.1/control_utils.js" crossOrigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/@mediapipe/drawing_utils@0.2/drawing_utils.js" crossOrigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/@mediapipe/pose@0.2/pose.js" crossOrigin="anonymous"></script>
      </head>
    
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
                      <video hidden id="input_video5" ></video>
                      <canvas id="output5" width="720px" height="720px"></canvas>
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
                      <Image src={character} alt="Your character" title="Your character(Thin)"></Image>
                      <canvas id="character" width="720px" height="720px"></canvas>
                    </div>
                </article>
                </div>
            </div>
            
            <div className="loading">
                <div className="spinner"></div>
            </div>
            {/* <div id="control5"></div> */}
            <div style={{visibility: "hidden"}} id="control5"></div>
        </main>

        {/* <script type="text/javascript" src="./pose_est.js"></script> */}
    </div>
  )
}
