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
        'option': 'Background Checks',
      },
      {
        'id': 2,
        'option': 'Surveillance',
      },
      {
        'id': 3,
        'option': 'Find a Person',
      },
      {
        'id': 4,
        'option': 'Corporate Investigations'
      },
    ]
  },

  {
    'id': 1,
    'title': 'BackGround Checks',
    'options': [
      {
        'id': 5,
        'option': 'Pre-Employment Screening',
      },
      {
        'id': 6,
        'option': 'Tenant Verification'
      },
      {
        'id': 7,
        'option': 'Dating Background Check'
      },
      {
        'id': 8,
        'option': 'Other:'
      }
    ]
  },

  {
    'id': 2,
    'title': 'Surveillance Services',
    'options': [
      {
        'id': 9,
        'option': 'Infidelity Investigation',
      },
      {
        'id': 10,
        'option': 'Insurance Fraud'
      },
      {
        'id': 11,
        'option': 'Child Custody Cases'
      },
      {
        'id': 12,
        'option': 'Other:'
      }
    ]
  },
  {
    'id': 3,
    'title': 'Find a Person',
    'options': [
      {
        'id': 13,
        'option': 'Skip Tracing'
      },
      {
        'id': 14,
        'option': 'Lost Family Members'
      },
      {
        'id': 15,
        'option': 'Asset Recovery'
      },
      {
        'id': 16,
        'option': 'Other:'
      }
    ]
  },

  {
    'id': 4,
    'title': 'Corporate Investigations',
    'options': [
      {
        'id': 17,
        'option': 'Employee Misconduct'
      },
      {
        'id': 18,
        'option': 'Due Diligence',
      },
      {
        'id': 19,
        'option': 'Fraud Investigation'
      },
      {
        'id': 20,
        'option': 'Other:'
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
  /*const answers = progressionId + 1*/

  const ProgressForward = (cue) =>{
    if(!otherActive){
      if (cue.id > 4){
        setProggresion(prevstate => prevstate + 33.33)
        console.log('out of bounds')

        let tl = gsap.timeline()

        tl.to(
          '#options',{
            autoAlpha: 0,
            duration: 1,
            onComplete: ()=>{
              setActiveForm(true)
            }
          }
        ).to(
          '#options',{
            autoAlpha: 1,
            duration: 1,
            delay: 1
          }
        )
        if(cue.option === 'Other:'){
          setOtherActive(true)
        }
      }
      else{
        let tl = gsap.timeline();

        tl.to('#options', {
          autoAlpha: 0,
          duration: 1,
          onComplete: () => {
            setProggresion(prevstate => prevstate + 33.33);
            setProgressionId(cue.id);
            setSelectedOption(null);
          }
        }).to('#options', {
          autoAlpha: 1,
          duration: 1,
          delay: 1
        });
      }
    }
    else{
      alert('you have succesfully submitted: ' + text + ' to the back end')
      setProggresion(0)
      setProgressionId(0)
      setOtherActive(false)
    }
  }

  const back = () => {
    setProgressionId(0)
    setProggresion(33.33)
  }

  const captureText = (e) =>{
    setText(e.target.value)
    console.log(text)
  }

  console.log(index)
  return (
    
    <div id = 'app'>
    {/*This is where the main page is located...everything in the app is here*/}

    {/*this is the header section on the app where the title of the page and the save button are located*/}
      <div id = 'header'>
      </div>

    {/*this is the main section of the app where the question prompts are located along with the options for answering the text prompts*/}
     <div id = 'main'>
        <div id = 'questions-section'>
          <h1> What do you need a <span id = 'highlighted'>Private Investigator </span>to do for you?</h1>
          {/*the code below is to dynamically change the question asked, the questions are taken from the list above*/}


        {/*the code below is to check if the option of other has been submitted. if the option has been submitted the buttons on screen are replaced by a text box*/}
          {otherActive? <h5>Please elaborate further</h5>: null}
        </div>
     {activeForm? 
     <form id='contact-info'>
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
          <form>
            <textarea onChange={captureText}/>
          </form>
        </div>
      : 
        <>
        {/*the code below is the aferomentioned buttons on the screen that will be replaced by a text area when other has been clicked*/}
        <div id = 'options'>
        {/*the code below is what allows for the variables inside index to be looped through and displayed accordingly*/}
          { index[progressionId].options.map((cue, index) => {
            return (
              <button id = 'option' key = {index}  onClick={()=> setSelectedOption(cue)}>
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


      <div id = 'terms'><h5> @2025 AmericanPrivateInvestigator.com | insert slogan | <span id = 'highlighted'> Terms of Service - Privacy Policy - Do Not Sell My Info </span></h5></div>
      <div id = 'progress-bar'>
          <div id = 'bar' style={{width: `${progression}%`, maxWidth : '100%'}}>
          </div>
      </div>
      <div id = 'submit'>
          { progressionId > 0 ?   <button onClick={back}>Back</button> : <button style={{cursor:'not-allowed', backgroundColor: '#0041e642'}}>Back</button>}
          { selectedOption ?   <button onClick={()=> ProgressForward(selectedOption)}>Next</button> : <button style={{cursor:'not-allowed', backgroundColor: '#0041e642'}}>Next</button>}
      </div>
    </div>
  )
}

export default App
