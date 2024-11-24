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

	const handleMaskFile = async (mask) => {
		if (['GOBLET', 'HIGHBALL', 'PARFAIT', 'FLUTE'].includes(mask)) {
		  const maskUrl = await import(`./assets/${mask}_mask.jpg`).then(module => module.default);
		  const maskResponse = await fetch(maskUrl);
		  return await maskResponse.blob();
		} else if (mask === 'UPLOAD') {
		  return new Promise((resolve) => {
			const input = document.createElement('input');
			input.type = 'file';
			input.accept = '.jpg,.jpeg';
			input.onchange = (event) => {
			  const file = event.target.files[0];
			  if (file) {
				resolve(file);
			  }
			};
			input.click();
		  });
		}
		return null;
	  };

	  const submitFormData = async (prompt, maskFile, serverUrl, mask) => {
		const formData = new FormData();
		formData.append('input', prompt);
		if (maskFile) {
		  formData.append('mask', maskFile, `${mask}_mask.jpg`);
		}
	  
		const response = await fetch(serverUrl + '/generate', {
		  method: 'POST',
		  body: formData,
		  headers: {
			'Accept': 'multipart/form-data',
		  },
		});
	  
		if (!response.ok) {
		  throw new Error('Failed to generate image');
		}
	  
		const blob = await response.blob();
		return URL.createObjectURL(blob);
	  };

	  const generateImage = async (prompt, setPrompt, mask) => {
		console.log("DEBUG: generate image");
		console.log({ input: prompt, mask: mask });
	  
		try {
		  setIsGenerating(true);
		  const serverUrl = process.env.REACT_APP_SERVER_URL;
		  let maskFile = await handleMaskFile(mask);
	  
		  if (mask === 'UPLOAD' && !maskFile) {
			return; // Prevent further execution until file is selected
		  }
	  
		  const imageUrl = await submitFormData(prompt, maskFile, serverUrl, mask);
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
