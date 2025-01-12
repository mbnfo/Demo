import { useEffect, useState } from 'react'
import './App.css'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import {useGeolocation} from './hooks/useGeolocation'
import GeolocationComponent from './components/Location'
import ContactForm from './sections/ContactForm'

window.addEventListener('load', function() {  window.scroll(0, 0) })
const index = [


  {
    'id': 0,
    'title': 'First Option Service Buttons',
    'options': [
      {
        'id': 1,
        'option': 'Background checks',
      },
      {
        'id': 2,
        'option': 'Surveillance',
      },
      {
        'id': 3,
        'option': 'Find a person',
      },
      {
        'id': 4,
        'option': 'Corporate investigations'
      },
    ]
  },

  {
    'id': 1,
    'title': 'BackGround checks',
    'options': [
      {
        'id': 5,
        'option': 'Background check'
      },
      {
        'id': 6,
        'option': 'Pre-employment screening',
      },
      {
        'id': 7,
        'option': 'Tenant verification'
      },
    ]
  },

  {
    'id': 2,
    'title': 'Surveillance services',
    'options': [
      {
        'id': 9,
        'option': 'Infidelity investigation',
      },
      {
        'id': 10,
        'option': 'Insurance fraud'
      },
      {
        'id': 11,
        'option': 'Child custody cases'
      },
    ]
  },
  {
    'id': 3,
    'title': 'Find a person',
    'options': [
      {
        'id': 13,
        'option': 'Skip tracing'
      },
      {
        'id': 14,
        'option': 'Lost family members'
      },
      {
        'id': 15,
        'option': 'Asset recovery'
      },
    ]
  },

  {
    'id': 4,
    'title': 'Corporate investigations',
    'options': [
      {
        'id': 17,
        'option': 'Employee misconduct'
      },
      {
        'id': 18,
        'option': 'Due diligence',
      },
      {
        'id': 19,
        'option': 'Fraud investigation'
      },
    ]
  }
]



function App() {

  const [progressionId, setProgressionId] = useState(0)
  const [progression, setProggresion] = useState (33.33)
  const [selectedOption, setSelectedOption] = useState()
  const [otherActive, setOtherActive] = useState(false)
  const [ALLOW_TRACK_LOCATION, setALLOW_TRACK_LOCATION] = useState(false)
  const [activeForm, setActiveForm] = useState(false)

  const [text, setText] = useState(null)
  const [question_1_data, setQuestion_1_Data] = useState('')
  const [question_2_data, setQuestion_2_Data] = useState('')
  const [location, setLocation] = useState({
    city: null,
    state: null,
  });

  const handleLocationUpdate = (city, state) => {
    setLocation({ city, state });
  };
  

  const Increment_For_Loading_Bar = 33.33
  const Out_Of_Bounds_id = 4
  /*const answers = progressionId + 1*/

  // const {locationError, locationInfo} = useGeolocation()
  // console.log({locationError, locationInfo})

  const ContinuationAnimation = (onComplete) => {
     let tl = gsap.timeline();
  
    tl.to('#options', {
      autoAlpha: 0,
      duration: 0.5,
      onComplete
    }).to('#options', {
      autoAlpha: 1,
      duration: 0.5,
      delay: 0.5,
    })

  }

  const HandleCue = (cue) =>{

    if (!otherActive) {

 // if the selected option is cue the code needs to set the form to a text area
      if (cue === 'Other') {
      //  ContinuationAnimation(()=>{
      //    setProggresion((prevstate) => prevstate + Increment_For_Loading_Bar)
      //    setActiveForm(false) 
      //    setOtherActive(true)
      //  })
      console.log('cue has been activated')
      setOtherActive(true)
      setProggresion((prevstate) => prevstate + Increment_For_Loading_Bar)
     } 

//else if the option is not an other and is simultaneously not one of the options from the first question (which effectively means they are from the second question) the code has to send the user to the contact form and colllect the data
//options from the first question or first set of options all have IDs of less than 4 or equal to 4...hence the sign
      else if (cue.id > Out_Of_Bounds_id && cue.option !== 'Other') {
        setProggresion((prevstate) => prevstate + Increment_For_Loading_Bar)
        ContinuationAnimation(()=>{
          setActiveForm(true)
          setSelectedOption(false)
          setQuestion_2_Data(cue)
        })}

//if the clicked option is not an "Other" option, nor a secondary options it means the option is from the first choice of options, so we need to collect that data and then send the user to the seconnd set of options     
      else{
        ContinuationAnimation(() => {
          setProggresion((prevstate) => prevstate + Increment_For_Loading_Bar)
          setProgressionId(cue.id);
          setQuestion_1_Data(cue)
          setSelectedOption(null)}
        )
      }
    } 
    //this means that the otherActive is actually active, meaning the user is seeing the data from the "other" option's text area and is thus sending their other data, we need to collect this data and then send the user to the contact form
    else if(otherActive) {
      ContinuationAnimation(()=>{
        setProggresion(Increment_For_Loading_Bar);
        setOtherActive(false);
        setActiveForm(true)
      })
    }
  };



  const HandleSubmit = () => {
    if(otherActive){
      alert(text)
      setOtherActive(false)
      setActiveForm(true)
      setProggresion(progression + Increment_For_Loading_Bar)
    }
  }

  

  const back = () => {
    ContinuationAnimation(()=>{
    setProgressionId(0)
    setProggresion(Increment_For_Loading_Bar)
    setActiveForm(false)
    setOtherActive(false)
    setQuestion_1_Data(null)
    setQuestion_2_Data(null)
    setALLOW_TRACK_LOCATION(false)
    })
  }
  

//captures the text from the "other" option text area and saves it in the text variable
  const captureText = (e) =>{
    setText(e.target.value)
    setSelectedOption(true)
  }

  return (
    
    <div id = 'app'>
    {/*This is where the main page is located...everything in the app is here*/}
    <div id = 'header'><h4>{question_2_data? question_2_data.option : question_1_data ? question_1_data.option : null}</h4>
    </div>
    {/*this is the main section of the app where the question prompts are located along with the options for answering the text prompts*/}
     <div id = 'main'>
        <div id = 'title-section'>
          {activeForm ? 
          <>
            <h1>Get the most qualified <span id = 'highlighted'>Private Investigator</span> for you needs</h1> 
            <div  id = 'title-section-2'>
              <p>We will connect you only with Private Investigators who have verified licenses in order to provide you the best service for the lowest price in you area.</p>
            </div>
            {!ALLOW_TRACK_LOCATION ? <button onClick={()=>setALLOW_TRACK_LOCATION(true)} className = "location-button">Detect your location?</button> : <GeolocationComponent onLocationUpdate={handleLocationUpdate} />}
          </>
            : <h1> What do you need a <span id = 'highlighted'>Private Investigator </span>to do for you?</h1>
          }
        
        </div>
     {activeForm? 
     <ContactForm text={text} question_1_data={question_1_data} question_2_data = {question_2_data} city={location.city} state={location.state} />
     : 
     
      <>
        {/*the code below is the aferomentioned buttons on the screen that will be replaced by a text area when other has been clicked*/}
        <div id="options">
  {/* Loop through and display available options dynamically */}
  {index[progressionId].options.map((cue, idx) => (
    <div id="option" key={idx}>
      <button onClick={() => HandleCue(cue)} id="btn">
        <h3>{cue.option}</h3>
      </button>
    </div>
  ))}

  {/* Display 'Other' button with conditional form */}
  {progressionId !== 0 && (
    <div id="option">
      <div onClick={() => !otherActive && HandleCue('Other')} id="other">
        {!otherActive ? <h3>Other</h3>: <h3 style={{opacity: '0'}}>Other</h3>}
        {otherActive && (
          <form onSubmit={HandleSubmit} s>
            <div id="input">
              <input
                type="text"
                onChange={captureText}
                placeholder="Tell us more"
                id="text-input"
                required
              />
              <input
                type="submit"
                id="submit-other-info"
                value="Submit"
                style={{margin: "auto"}}
              />
            </div>
          </form>
        )}
      </div>
    </div>
  )}
</div>

     </>
      }
      </div>


      <div id = 'terms'>{activeForm? <h5>By submitting you agree to share your contact info with a Americanprivateinvestigator.com and be contacted about private investigator services. There's no obligation to purchase any service. </h5> : <h5> @ 2025 AmericanPrivateInvestigator.com | <span id = 'highlighted-2'> Terms of Service - Privacy Policy -We Do Not Sell My Info </span></h5>}</div>
      <div id = 'progress-bar'>
          <div id = 'bar' style={{width: `${progression}%`, maxWidth : '100%'}}>
          </div>
      </div>
      <div id = 'back'>
          { progressionId > 0 ?   <button onClick={back}>Back</button> : <button style={{cursor:'not-allowed', backgroundColor: '#0041e642'}}>Back</button>}
      </div>
    </div>
  )
}

export default App
