import { Form, Footer, Header } from './components';
import preview from './assets/preview.png';
import Loader from './assets/loader.gif'
import { downloadImage } from './utils';

import { useState } from 'react';

const App = () => {
	// const [isLoading, setIsLoading] = useState(false)
	const [isGenerating, setIsGenerating] = useState(false);
	const [generatedImage, setGeneratedImage] = useState({
		photo: null,
		altText: null,
	});

	const generateImage = async (prompt, setPrompt) => {
		console.log("DEBUG: generate image")
		console.log({ input: prompt })
		console.log(process.env.REACT_APP_SERVER_URL)

		try {
			setIsGenerating(true);
			const serverUrl = process.env.REACT_APP_SERVER_URL;
			const response = await fetch(serverUrl + '/generate', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ input: prompt }), 
			});

			if (!response.ok) {
				throw new Error('Failed to generate image');
			}

			const blob = await response.blob();
			const imageUrl = URL.createObjectURL(blob);
			setGeneratedImage({
				photo: imageUrl,
				altText: 'Generated Image',
			});
			setPrompt('');
		} catch (error) {
			console.error('Error generating image:', error);
		} finally {
			setIsGenerating(false);
		}
	};

	return (
		<div className='container'>
			<Header />
			<main className="flex-container">
				<Form generateImage={generateImage} prompt={prompt} />
				
				<div className="image-container">
					{generatedImage.photo ? (
						<img
							src={generatedImage.photo}
							alt={generatedImage.altText}
							className="imgg ai-img"
						/>
					) : (
						<img
							src={preview}
							alt="preview"
							className="imgg preview-img"
						/>
					)}

					{isGenerating && (
						<div className="loader-comp">
							<img src={Loader} alt="" className='loader-img' />
						</div>
					)}
					<button
						className="btn"
						onClick={() => downloadImage(generatedImage.photo)}
					>
						Download
					</button>
				</div>
			</main>
			<Footer />
		</div>
	);
};

export default App;
