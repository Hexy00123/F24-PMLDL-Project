import { useState } from 'react';
import Checkbox from './Checkbox';

const Form = ({ generateImage }) => {
    const [prompt, setPrompt] = useState('')

    return (
        <div className="form-section">
            <div className="container-title">
                <h1 className="title">Enter drink recipe</h1>
            </div>
            <div className="form-container">
                <div className="input-div">
                    <label>Prompt</label>
                    <div className="input-cont">
                        <textarea name="prompt" id="" cols="30" rows="4" value={prompt} onChange={(e) => setPrompt(e.target.value)} className="form-control" placeholder="Café con Leche: Equal parts espresso and steamed milk."></textarea>
                    </div>
                </div>

                <div className="container-title">
                    <h1 className="title">Select drink mask</h1>
                </div>
            <Checkbox />
                <button className='btn' onClick={() => {
                    const selectedRadio = document.querySelector('input[type="radio"]:checked');
                    const selectedRadioValue = selectedRadio.labels[0].innerText;
                    console.log(selectedRadio.labels[0].innerText);
                    generateImage(prompt, setPrompt, selectedRadioValue)
                }}>Generate</button>

            </div>
        </div>
    )
}


export default Form