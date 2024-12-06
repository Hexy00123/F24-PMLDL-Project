from PIL import Image
from diffusers import ControlNetModel, StableDiffusionControlNetInpaintPipeline
import torch
import cv2
import numpy as np
from transparent_background import Remover


class Generator():
    def __init__(self):
        controlnet = ControlNetModel.from_pretrained("lllyasviel/sd-controlnet-canny", torch_dtype=torch.float16)
        self.pipe = StableDiffusionControlNetInpaintPipeline.from_pretrained("ThreeBibas/sd1.5-napitochki-finetune",
                                                                             torch_dtype=torch.float16,
                                                                             controlnet=controlnet).to("cuda")

        self.negative_prompt = 'low quality, bad quality, sketches'
        self.remover = Remover(mode='base')

    def __call__(self, image, prompt):
        mask_real = self.remover.process(image, type='map')

        low_threshold = 150
        high_threshold = 400

        image = cv2.Canny(np.array(image), low_threshold, high_threshold)
        image = image[:, :, None]
        image = np.concatenate([image, image, image], axis=2)
        blurred_image = cv2.GaussianBlur(image, (5, 5), 0)
        canny = Image.fromarray(blurred_image)

        white_img = Image.new('RGB', canny.size, color='white')
        # torch.manual_seed(228)
        # controlnet_conditioning_scale = 1.0
        image = self.pipe(prompt=prompt, negative_prompt=self.negative_prompt, image=white_img, control_image=canny,
                          mask_image=mask_real, num_images_per_prompt=1).images[0]

        return image
