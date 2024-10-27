import { FaRandom } from 'react-icons/fa';
import { useState } from 'react';

const Form = ({ generateImage }) => {
    const [prompt, setPrompt] = useState('')

    return (
        <div className="form-section">
            <div className="container-title">
                <h1 className="title">Какой та загаловак</h1>
            </div>
            <div className="form-container">
                <div className="input-div">
                    <label>Prompt</label>
                    <div className="input-cont">
                        <textarea name="prompt" id="" cols="30" rows="4" value={prompt} onChange={(e) => setPrompt(e.target.value)} className="form-control" placeholder="Café con Leche: Equal parts espresso and steamed milk."></textarea>
                    </div>
                </div>
                <button className='btn' onClick={() => generateImage(prompt, setPrompt)}>Generate ✨</button>
            </div>
        </div >
    )
}


export default Form