import { useEffect, useState } from 'react'
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
  const [activeForm, setActiveForm] = useState(false)

  const [text, setText] = useState('')
  const [question_1_data, setQuestion_1_Data] = useState(null)
  const [question_2_data, setQuestion_2_Data] = useState(null)
  const [userName, setUserName] = useState(null)
  const [userEmail, setUserEmail] = useState(null)
  const [userContact, setUserContact] = useState(null)

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
          setQuestion_2_Data(cue)
        })}

//if the clicked option is not an "Other" option, nor a secondary options it means the option is from the first choice of options, so we need to collect that data and then send the user to the seconnd set of options     
      else{
        ContinuationAnimation(() => {
          setProggresion((prevstate) => prevstate + Increment_For_Loading_Bar)
          setProgressionId(cue.id);
          setQuestion_1_Data(cue)
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


  const formatPhoneNumber = (value) => {
    // Remove all non-digit characters
    const cleaned = value.replace(/\D/g, '');

    // Format the number
    const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);

    if (!match) return cleaned;

    const [, areaCode, firstPart, secondPart] = match;

    if (secondPart) {
        return `(${areaCode}) ${firstPart} ${secondPart}`;
    } else if (firstPart) {
        return `(${areaCode}) ${firstPart}`;
    } else if (areaCode) {
        return `(${areaCode}`;
    }

    return '';
};
  
const handleNumberChange = (e) => {
  const input = e.target.value;
  const formatted = formatPhoneNumber(input);
  setUserContact(formatted);
};


  const HandleSubmit = () => {
    if(otherActive){
      alert(text)
      setOtherActive(false)
      setActiveForm(true)
    }
    else{
      alert(' Name: '+  userName + ' Email: ' + userEmail + ' Contact info: ' + userContact)
      setActiveForm(false)
    }
  }
  


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
          <input type='text' id = 'text-input' placeholder='Full Name' required onChange={(e)=>setUserName(e.target.value)}/>
       </div>
       <div id = 'input'>
        <label for = 'Email'><h3>Email*</h3></label>
          <input type = 'email' id = 'text-input' placeholder='example@email.com' required onChange={(e)=>setUserEmail(e.target.value)}/>
       </div>
       <div id = 'input'>
        <label for = 'Phone Number'><h3>Number*</h3></label>
          <input type = 'tel' id = 'text-input'  placeholder="000-000-0000" maxlength="14" autocomplete="tel" onChange={handleNumberChange} value = {userContact} />
       </div>
       <div>
        <input type='submit' id = 'submit-contact-info' onClick={HandleSubmit}/>
       </div>
     </form>
     : 
     
      <>
      {otherActive? 
        <div>
          <form id='options' className = 'other-form'>
            <textarea onChange={captureText} placeholder='Tell us more'/>   
          <input type='submit' id = 'submit-contact-info' onClick={HandleSubmit}/>
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

//front end part for submitting to sql

 {/* 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch('http://localhost:3001/api/data', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text, question_1_data, question_2_data,   }),
        });

        if (response.ok) {
            alert('Data sent successfully!');
        } else {
            alert('Error sending data.');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}*/}



//back end part using nodejs to submit the sql
{/* 
  
Note: this is a package required to be installed in a terminal -----> [npm install express body-parser mysql2]

const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
const port = 3001;

// Middleware
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'yourUsername',
    password: 'yourPassword',
    database: 'yourDatabaseName',
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to database!');
});

// API endpoint to receive data
app.post('/api/data', (req, res) => {
    const { name, age } = req.body;

    const query = 'INSERT INTO users (name, age) VALUES (?, ?)';
    db.query(query, [name, age], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).send('Database error');
        } else {
            res.status(200).send('Data inserted successfully!');
        }
    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

 */}