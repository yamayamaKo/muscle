import styles from '../styles/Home.module.css'
import img_squat1 from "../public/images/squat1_small.png"
import img_squat2 from "../public/images/squat2_small.png"
import React from "react"
import { useEffect } from 'react';
import Link from 'next/link'

import Image from 'next/image'
import Router, { useRouter } from 'next/router'
import { FPS } from '@mediapipe/control_utils';
import PageLayout from '../components/PageLayout';


var goal = 10;
var count = 0;
var isStarted = false;
var mode = 'squat';


// const StartButton = React.forwardRef(({ onClick}, ref) => {
//     return (
//       <a onClick={onClick} ref={ref}>
//         Start
//       </a>
//       <script>
//         console.log('started');
//       </script>
//     )
// })

const BackButton = React.forwardRef(({ onClick, href }, ref) => {
  return (
    <a href={href} onClick={onClick} ref={ref}>
      Back
    </a>
  )
})


export default function Training() {
  const router = useRouter()
  useEffect(()=>{
    if (process.browser) {
        goal = router.query.cnt ? Number(router.query.cnt) : goal 
        mode = router.query.mode ? router.query.mode : mode
        console.log(count);
        const webcam = document.getElementById('webcam');
        const out = document.getElementById('output');
        
        // var squat_img = new Image()
        // squat_img.src = '../images/squat1.png';
        // var stand_img = new Image()
        // stand_img.src = '../images/squat2.png';


        // console.log('image typpe: ', typeof(stand_img.image));

        // const squat1 = new Image();

        // const character = document.getElementById('character');
        const controlsElement = document.getElementById('control');
        const canvasCtx = out.getContext('2d');
        // const canvas = document.getElementById('character');
        // const ctx = canvas.getContext("2d");
        // const canvasChara = character.getContext('2d');

        // const squat_img = new Image();
        // squat_img.src = "../Asstes/img/squat/squat2.png";  // 画像のURLを指定
        // squat_img.onload = () => {
        //   canvasChara.drawImage(squat_img, 0, 0);
        // };
        
        console.log(webcam);
        const fpsControl = new FPS();
        
        var prev = new Date();
        
        const spinner = document.querySelector('.loading');
        spinner.ontransitionend = () => {
          spinner.style.display = 'none';
        };

        function drawing_stand() {
          var canvas = document.getElementById("character");
          var cw = canvas.width;
          var ch = canvas.height;
          var context = canvas.getContext("2d");
          context.clearRect(0, 0, cw, ch);
        
            // var img=new Image();
            //                 img.src = "images/squat2.png";
          var img=document.getElementById("squat2");
          console.log("stand", img)
          // function() {
          context.drawImage(img, 0, 0);
        
            // var imageData = context.getImageData(0, 0, cw, cw);
        
          console.log("stand: ", img.image)
        
            // context.putImageData(imageData, 0, 0);
          // }
        }

        function drawing_squat() {
          var canvas = document.getElementById("character");
          var cw = canvas.width;
          var ch = canvas.height;
          var context = canvas.getContext("2d");
          context.clearRect(0, 0, cw, ch);
        
            // var img=new Image();

            // img.src = "images/squat1.png";
            var img=document.getElementById("squat1");
            console.log("stand", img)
            // img.onload = function() {
                          context.drawImage(img, 0, 0);
                          // var imageData = context.getImageData(0, 0, 480, 480);
                          console.log("squat: ", img.image)
        
            // context.putImageData(imageData, 0, 0);
          // }
        }
    
        function draw(isSquat){
          // ctx.save();
          // ctx.clearRect(0, 0, ctx.width, ctx.height);
          ctx.font = 'bold 30pt sans-serif';
          ctx.strokeStyle = '#00ff00';
          ctx.lineWidth = 3;
          ctx.strokeText("Cannot detect your body", ctx.width/2, ctx.height/2);
          var img = new Image();
          if(isSquat){
            img.src = "../public/images/squat1.png";
          }
          else{
            img.src = "../public/images/squat2.png";
          }
          // console.log("draw ", typeof(img));
          img.onload = () => {
            ctx.drawImage(img, 0, 0, ctx.width, ctx.height);
            console.log('Drawed', isSquat);
         }
        //  ctx.restore();
        }

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
          console.log(count)
          if(count <= goal){
            document.body.classList.add('loaded');
            fpsControl.tick();
          
            switch (mode){
              case 'squat':
                var idx1 = 24
                var idx2 = 26
                var idx3 = 28
                var thresh = 120
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
            

            canvasCtx.save();
            // console.log(mode, idx1, idx2, idx3, thresh, results.poseLandmarks[0]);
            if(results.poseLandmarks[idx1]!=null && results.poseLandmarks[idx2]!=null && results.poseLandmarks[idx3]!=null){
              var angle = calc_angle(results.poseLandmarks[idx1],results.poseLandmarks[idx2],results.poseLandmarks[idx3]);
            }
            else{
              var angle = 1000000;
              canvasCtx.font = 'bold 30pt sans-serif';
              canvasCtx.strokeStyle = '#00ff00';
              canvasCtx.lineWidth = 3;
              canvasCtx.strokeText("Cannot detect your body", out.width/2, out.height/2);
            }
            // console.log(angle);
            var now = new Date();
            now = now.getTime();
            var dt = (now/1000).toFixed(2) - (prev/1000).toFixed(2);
            // console.log(dt);
            // Draw_bend();
            // canvasChara.save();
            if(angle < thresh){
              // console.log('BEND!');
              if(dt > interval){
                // console.log('++');
                count += 1
                prev = new Date();
                prev = prev.getTime();
              }
              if(mode == 'squat'){
                console.log("bend");
                // var img_src = "../images/squat1.png";
                // var isSquat=true;
                // draw(isSquat);
                drawing_squat()
              }
            
            }
            else{
              prev = new Date();
              prev = prev.getTime();
              if(mode == 'squat'){
                // var img_src = "../images/squat2.png";
                // var isSquat=false;
                // draw(isSquat);
                drawing_stand()
              }
            }
            // canvasChara.restore();
            // console.log(mode, angle, count);

            
            canvasCtx.clearRect(0, 0, out.width, out.height);
            canvasCtx.drawImage(
                results.image, 0, 0, out.width, out.height);
            drawConnectors(
                canvasCtx, results.poseLandmarks, POSE_CONNECTIONS, {
                  color: (data) => {
                    const x0 = out.width * data.from.x;
                    const y0 = out.height * data.from.y;
                    const x1 = out.width * data.to.x;
                    const y1 = out.height * data.to.y;
          
                    const z0 = clamp(data.from.z + 0.5, 0, 1);
                    const z1 = clamp(data.to.z + 0.5, 0, 1);
          
                    const gradient = canvasCtx.createLinearGradient(x0, y0, x1, y1);
                    gradient.addColorStop(
                        0, `rgba(0, ${255 * z0}, ${255 * (1 - z0)}, 1)`);
                    gradient.addColorStop(
                        1.0, `rgba(0, ${255 * z1}, ${255 * (1 - z1)}, 1)`);
                    return gradient;
                  }
                });
            drawLandmarks(
                canvasCtx,
                Object.values(POSE_LANDMARKS_LEFT)
                    .map(index => results.poseLandmarks[index]),
                {color: zColor, fillColor: '#FF0000'});
            drawLandmarks(
                canvasCtx,
                Object.values(POSE_LANDMARKS_RIGHT)
                    .map(index => results.poseLandmarks[index]),
                {color: zColor, fillColor: '#00FF00'});
            drawLandmarks(
                canvasCtx,
                Object.values(POSE_LANDMARKS_NEUTRAL)
                    .map(index => results.poseLandmarks[index]),
                {color: zColor, fillColor: '#AAAAAA'});
          
              canvasCtx.font = 'bold 50pt sans-serif';
              canvasCtx.strokeStyle = '#ff0000';
              canvasCtx.lineWidth = 5;
              canvasCtx.strokeText(mode, Math.round(out.width/2)-50, 55);
            
              canvasCtx.font = 'bold 60pt sans-serif';
              canvasCtx.strokeStyle = '#00ff00';
              canvasCtx.lineWidth = 5;
              canvasCtx.strokeText(angle, 20,80);
              canvasCtx.strokeText(count, out.width-100, out.height-50);
              
              canvasCtx.font = 'bold 30pt sans-serif';
              canvasCtx.strokeStyle = '#00ff00';
              canvasCtx.lineWidth = 3;
              canvasCtx.strokeText("count: ", out.width-300, out.height-50);
              canvasCtx.strokeText(dt, out.width-100, 50);
          
            canvasCtx.restore();
            }
            else{
              console.log('You did it!')
              count = 0;
              // Router.push('/resultNormal') 
            }
        }
        
        const pose = new Pose({locateFile: (file) => {
          // console.log('a')
          // console.log(typeof file)
          // console.log(file)
          return `https://cdn.jsdelivr.net/npm/@mediapipe/pose@0.2/${file}`;
        },});
        pose.onResults(onResultsPose);
        
        const camera = new Camera(webcam, {
          onFrame: async () => {
            await pose.send({image: webcam});
          },
          width: 480,
          height: 480
        });
        camera.start();
        
        new ControlPanel(controlsElement, {
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
              webcam.classList.toggle('selfie', options.selfieMode); // uncomment this if you use webcam
              pose.setOptions(options);
            });
        }
    },[])
  return (
    <PageLayout pageNum="2">
      <div>
          <main>
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
                        <video hidden id="webcam"></video>
                        <canvas id="output" width="720px" height="720px"></canvas>
                      </div>
                  </article>
                  <div className="panel-heading">                
                      {/* <StartButton/> */}
                  </div>
                  <div className="panel-heading">
                    <Link href="/trainingIndex" passHref>
                      <BackButton/>
                    </Link>
                  </div>
                  </div>
                  

                  {/* MEDIAPIPE OUTPUT */}
                  <div className="column">
                  <article className="panel is-info">
                      <p className="panel-heading">
                      Mediapipe Pose Detection
                      </p>  
                      <div className="panel-block">  
                        <canvas id="character" width="720px" height="1080px" ></canvas>
                      </div>
                  </article>
                  </div>
                  
              </div>

              
              <div className="loading">
                  <Image  src="/images/squat1_small.png" width="720px" height="1080px" id="squat1"></Image> 
                  <Image  src="/images/squat2_small.png" width="720px" height="1080px" id="squat2"></Image>
                  <div className="spinner"></div>
              </div>
              {/* <div id="control"></div> */}
              <div style={{visibility: "hidden"}} id="control"></div>
          </main>

          {/* <script type="text/javascript" src="./pose_est.js"></script> */}
      </div>
    </PageLayout>
  )
}
