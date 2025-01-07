import { useState } from 'react'
import './App.css'

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
  /*const answers = progressionId + 1*/

  const ProgressForward = (cue) =>{
    if(!otherActive){
      if (cue.id > 4){
        console.log('out of bounds')
        setProggresion(99)
        alert('you have succesfully submitted: ' + cue.option + ' to the backend')
        if(cue.option === 'Other:'){
          setOtherActive(true)
        }
        else{
          setProgressionId(0)
        }
      }
      else{
        setProggresion(prevstate => prevstate + 33.33)
        setProgressionId(cue.id)
        setSelectedOption(null)
      }
    }
    else{
      alert('you have succesfully submitted: ' + text + ' to the back end')
      setProggresion(0)
      setProgressionId(0)
      setOtherActive(false)
    }
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
        <h4>Hadley's Private Investigations</h4>
        <h4 id = 'save'>save</h4>
      </div>

    {/*this is the main section of the app where the question prompts are located along with the options for answering the text prompts*/}
     <div id = 'main'>
        <div id = 'questions-section'>
          <h1> What do you need a Private Investigator to do for you?</h1>
          {/*the code below is to dynamically change the question asked, the questions are taken from the list above*/}
          <p>{index[progressionId].title}</p>


        {/*the code below is to check if the option of other has been submitted. if the option has been submitted the buttons on screen are replaced by a text box*/}
          {otherActive? <h5>Please elaborate further</h5>: null}
        </div>
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
      </div>


      <div id = 'terms'><h5 id = 'unclickable'> @2025 Hadley's Private Investigations | insert slogan </h5> <h5 id = 'clickable'>| terms of service - Privacy Policy - Do Not Sell My Info</h5></div>
      <div id = 'progress-bar'>
          <div id = 'bar' style={{width: `${progression}%`}}>
          </div>
      </div>
      <div id = 'submit'>
          { selectedOption ?   <button onClick={()=> ProgressForward(selectedOption)}>Next</button> : <button style={{cursor:'not-allowed', backgroundColor: '#0041e642'}}>Next</button>}
      </div>
    </div>
  )
}

export default App
