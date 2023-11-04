import handSignIcon from '../icons/handSignIcon.png'
import marketMood from '../icons/marketMood.jpg'
import sortingVisualiser from '../icons/sortingVisualiser.png'
import sdp from '../icons/sdp.png'


const data =
{
    "name":"Pavan",
    "headerTaglineOne":"Hello 👋",
    "headerTaglineTwo":"I'm Pavan Chhalani",
    "headerTaglineThree":"Developer",
    "headerTaglineFour":"based in Edinburgh, UK.",
    "showCursor":true,
    "showBlog":true,
    "darkMode":true,
    "showResume":true,
    "socials":[
       {
          "id":"1",
          "title":"Github",
          "link":"https://github.com/PC53"
       },
       {
          "id":"2",
          "title":"LinkedIn",
          "link":"https://www.linkedin.com/in/pavan-chhalani/"
       },
       {
          "id":"3",
          "title":"Twitter",
          "link":"https://twitter.com/"
       },
       {
          "id":"4",
          "title":"Blog",
          "link":"https://blog.com/"
       },
       {
          "id":"5",
          "title":"Email",
          "link":"mailto:chhalanipavan@gmail.com"
       }
    ],
    "projects":[
       {
          "id":"1",
          "title":"SignSpeak",
          "description":"Real-Time Hand Sign Recognition for Inclusive Communication",
          "imageSrc":"../icons/handSignIcon.png",
          "url":"https://github.com/PC53/HandSignDetection-TF/blob/main/"
       },
       {
          "id":"2",
          "title":"MarketMood",
          "description":"Sentiment-Driven Stock Forecaster",
          "imageSrc":{marketMood},
          "url":"https://github.com/PC53/NewsBased-Market-Predictor"
       },
       {
          "id":"3",
          "title":"Sorting Algorithm Visualiser",
          "description":"Helping learners grasp sorting algorithms",
          "imageSrc":{sortingVisualiser},
          "url":"https://github.com/PC53/Sorting-Visualiser"
       },
       {
          "id":"4",
          "title":"System Design Project",
          "description":"Mobile Alarm Clock",
          "imageSrc":{sdp},
          "url":"https://github.com/SDP23Group3"
       }
    ],
    
    "aboutpara":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    "resume":{
       "tagline":"👋  I'm a software engineer, product designer.",
       "description":"I have delivered world-class user experiences to millions of people. Well-versed with React, Javascript, and most of the Web frameworks.",
       "experiences":[
          {
             "id":"1",
             "dates":"March 2022 - Present",
             "type":"Full Time",
             "position":"Frontend Engineer at X",
             "bullets":"Bullet One, Bullet Two"
          },
          {
             "id":"d495c23b-4f65-479a-9b8a-cfbc1c089725",
             "dates":"July 2020 - March 2022",
             "type":"Full Time",
             "position":"Frontend Engineer at X",
             "bullets":"Worked on the frontend of a React application, Worked on the frontend of a React application"
          }
       ],
       "education":{
          "universityName":"University of Edinburgh",
          "universityDate":"2020-2024",
          "universityPara":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book"
       },
       "languages":[
          "Javascript",
          "Python",
          "Java",
          "C"
       ],
       "frameworks":[
          "React",
          "Typescript",
          "NodeJs"
       ],
       "others":[
          "Figma",
          "wordPress",
          "FIrebase"
       ]
    }
 }


export default data;