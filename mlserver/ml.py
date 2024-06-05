from transformers import MBartForConditionalGeneration, MBart50TokenizerFast

from diffusers import DiffusionPipeline
from transformers import pipeline
import torch
from PIL import Image  
import PIL

def ml_awesome(self, prompt_ru):
        pipe = DiffusionPipeline.from_pretrained("stabilityai/stable-diffusion-xl-base-1.0", torch_dtype=torch.float16, use_safetensors=True, variant="fp16")
        pipe.to("cuda")
        
        model = MBartForConditionalGeneration.from_pretrained("facebook/mbart-large-50-many-to-one-mmt")
        tokenizer = MBart50TokenizerFast.from_pretrained("facebook/mbart-large-50-many-to-one-mmt")

        # translate Hindi to English
        tokenizer.src_lang = "ru_RU"
        encoded_hi = tokenizer(prompt_ru, return_tensors="pt")
        generated_tokens = model.generate(**encoded_hi)
        translated_text = tokenizer.batch_decode(generated_tokens, skip_special_tokens=True)
        '''prompt = "realistic new pink 3d car with ribbon for app icon"'''
        
        final_prompt = translated_text[0] + "; vector 3d app icon; blue color; orange color; big number 17"
        print(final_prompt)
        images = pipe(final_prompt).images[0]
        images.save("./image1.png", width=512, heigth=512)