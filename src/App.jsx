import { useState } from 'react'
import './App.css'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

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
        'option': 'Pre-employment screening',
      },
      {
        'id': 6,
        'option': 'Tenant verification'
      },
      {
        'id': 7,
        'option': 'Dating background check'
      },
      {
        'id': 8,
        'option': 'Other'
      }
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
      {
        'id': 12,
        'option': 'Other'
      }
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
      {
        'id': 16,
        'option': 'Other'
      }
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
      {
        'id': 20,
        'option': 'Other'
      }
    ]
  }
]



function App() {

  const [progressionId, setProgressionId] = useState(0)
  const [progression, setProggresion] = useState (33.33)
  const [selectedOption, setSelectedOption] = useState()
  const [otherActive, setOtherActive] = useState(false)
  const [text, setText] = useState('')
  const [activeForm, setActiveForm] = useState(false)
  const [question_1_data, setQuestion_1_Data] = useState(null)
  const Increment_For_Loading_Bar = 33.33
  const Out_Of_Bounds_id = 4
  /*const answers = progressionId + 1*/

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
      if (cue.option === 'Other') {
       ContinuationAnimation(()=>{
         setProggresion((prevstate) => prevstate + Increment_For_Loading_Bar);
         setActiveForm(false) 
         setOtherActive(true)
       })
     } 
//else if the option is not an other and is simultaneously not one of the options from the first question (which effectively means they are from the second question) the code has to send the user to the contact form and colllect the data
//options from the first question or first set of options all have IDs of less than 4 or equal to 4...hence the sign
      else if (cue.id > Out_Of_Bounds_id && cue.option !== 'Other') {
        setProggresion((prevstate) => prevstate + Increment_For_Loading_Bar)
        ContinuationAnimation(()=>{
          setActiveForm(true)
          setSelectedOption(false)
        })}

//if the clicked option is not an "Other" option, nor a secondary options it means the option is from the first choice of options, so we need to collect that data and then send the user to the seconnd set of options     
      else{
        ContinuationAnimation(() => {
          setProggresion((prevstate) => prevstate + Increment_For_Loading_Bar)
          setProgressionId(cue.id);
          setQuestion_1_Data(cue.option)
          setSelectedOption(null)})
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
  

  const back = () => {
    ContinuationAnimation(()=>{
    setProgressionId(0)
    setProggresion(Increment_For_Loading_Bar)
    setActiveForm(false)
    setOtherActive(false)
    })
  }


//captures the text from the "other" option text area and saves it in the text variable
  const captureText = (e) =>{
    setText(e.target.value)
    setSelectedOption(true)
  }

  console.log(index)
  return (
    
    <div id = 'app'>
    {/*This is where the main page is located...everything in the app is here*/}

    {/*this is the main section of the app where the question prompts are located along with the options for answering the text prompts*/}
     <div id = 'main'>
        <div id = 'questions-section'>
          <h1> What do you need a <span id = 'highlighted'>Private Investigator </span>to do for you?</h1>
          {/*the code below is to dynamically change the question asked, the questions are taken from the list above*/}


        {/*the code below is to check if the option of other has been submitted. if the option has been submitted the buttons on screen are replaced by a text box*/}
        </div>
     {activeForm? 
     <form className='contact-info' id='options'>
       <div id = 'input' >
        <label for = 'Name'><h3>Name*</h3></label>
          <input type='text' id = 'text-input' placeholder='Full Name' required/>
       </div>
       <div id = 'input'>
        <label for = 'Email'><h3>Email*</h3></label>
          <input type = 'email' id = 'text-input' placeholder='example@email.com' required/>
       </div>
       <div id = 'input'>
        <label for = 'Phone Number'><h3>Number*</h3></label>
          <input type = 'tel' id = 'text-input' pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" placeholder="000-000-0000" maxlength="12" autocomplete="tel"/>
       </div>
       <div>
        <input type='submit' id = 'submit-contact-info'/>
       </div>
     </form>
     : 
     
      <>
      {otherActive? 
        <div>
          <form id='options' className = 'other-form'>
            <textarea onChange={captureText} placeholder='Tell us more'/>   
          <input type='submit' id = 'submit-contact-info' onClick={()=>setActiveForm(true)}/>
          </form>
        </div>
      : 
        <>
        {/*the code below is the aferomentioned buttons on the screen that will be replaced by a text area when other has been clicked*/}
        <div id = 'options'>
        {/*the code below is what allows for the variables inside index to be looped through and displayed accordingly*/}
          { index[progressionId].options.map((cue, index) => {
            return (
              <button id = 'option' key = {index}  onClick={()=> HandleCue(cue)}>
              {/*this button sets in the option selected by the user into a variable*/}
                <p>{cue.option}</p>
              </button>
            )
          }) }
        </div>
      </>
     }
     </>
      }
      </div>


      <div id = 'terms'>{activeForm? <h5>By submitting you agree to share your contact info with a Americanprivateinvestigator.com and be contacted about private investigator services. There's no obligation to purchase any service. </h5> : <h5> @ 2025 AmericanPrivateInvestigator.com | <span id = 'highlighted-2'> Terms of Service - Privacy Policy -We Do Not Sell My Info </span></h5>}</div>
      <div id = 'progress-bar'>
          <div id = 'bar' style={{width: `${progression}%`, maxWidth : '100%'}}>
          </div>
      </div>
      <div id = 'submit'>
          { progressionId > 0 ?   <button onClick={back}>Back</button> : <button style={{cursor:'not-allowed', backgroundColor: '#0041e642'}}>Back</button>}
      </div>
    </div>
  )
}

export default App
