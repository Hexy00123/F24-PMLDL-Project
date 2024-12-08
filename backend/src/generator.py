from PIL import Image
from diffusers import ControlNetModel, StableDiffusionControlNetInpaintPipeline
import torch
import cv2
import numpy as np
from transparent_background import Remover


class Generator():
    def __init__(self):
        controlnet = ControlNetModel.from_pretrained("ThreeBibas/sd1.5-canny-controlnet-napitochki-finetune-1", torch_dtype=torch.float16)
        self.pipe = StableDiffusionControlNetInpaintPipeline.from_pretrained("ThreeBibas/sd1.5-napitochki-finetune",
                                                                             torch_dtype=torch.float16,
                                                                             controlnet=controlnet).to("cuda")

        self.negative_prompt = 'low quality, bad quality, sketches'
        self.remover = Remover(mode='base')

    def __call__(self, image, prompt):
        torch.cuda.empty_cache()
        image = image.convert('RGB')

        max_size = 720
        if min(image.width, image.height) > max_size:
            ratio = max_size / min(image.width, image.height)
            new_size = (int(image.width * ratio), int(image.height * ratio))
            image = image.resize(new_size)

        mask_real = self.remover.process(image, type='map')
        image = np.array(image)
        gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

        otsu_thresh, _ = cv2.threshold(gray_image, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
        high_threshold = otsu_thresh
        low_threshold = 0.2 * otsu_thresh
        canny_image = cv2.Canny(gray_image, int(low_threshold), int(high_threshold))
        canny_image = canny_image[:, :, None]
        canny_image = np.concatenate([canny_image, canny_image, canny_image], axis=2)
        canny_image = Image.fromarray(canny_image)


        white_img = Image.new('RGB', canny_image.size, color='white')

        image = self.pipe(prompt=prompt, negative_prompt=self.negative_prompt, image=white_img, control_image=canny_image,
                          mask_image=mask_real, num_images_per_prompt=1).images[0]

        return image
