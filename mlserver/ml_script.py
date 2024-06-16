import torch
from huggingface_hub import hf_hub_download, upload_file
from diffusers import DiffusionPipeline
from transformers import T5ForConditionalGeneration, T5Tokenizer
from diffusers.models import AutoencoderKL
from safetensors.torch import load_file
from rembg import remove
from PIL import Image
import uuid
import random

def get_uuid():
     myuuid = uuid.uuid4()
     print('Your UUID is: ' + str(myuuid))   
     return str(myuuid)

banner_type =  ""
product = ""
width = 512
height = 512


def parseJSON(json):
    global width
    global height
    global banner_type
    global product
    width = int(json["banner"]["width"])
    height = int(json["banner"]["height"])
    banner_type = json["banner"]["banner_type"]
    product = json["product"]


def translate_text(prompt_ru):
       device = 'cuda' #or 'cpu' for translate on cpu
       model_name = 'utrobinmv/t5_translate_en_ru_zh_small_1024'
       model = T5ForConditionalGeneration.from_pretrained(model_name)
       model.to(device)
       tokenizer = T5Tokenizer.from_pretrained(model_name)
       prefix = 'translate to en: '
       src_text = prefix + prompt_ru
       input_ids = tokenizer(src_text, return_tensors="pt")
       generated_tokens = model.generate(**input_ids.to(device))
       result = tokenizer.batch_decode(generated_tokens, skip_special_tokens=True)
       print(result)
       return result[0]
       
def ml_awesome(json, id): 
        
        parseJSON(json)    
        text = json["prompt"]
        if text == "":
            text = get_text(json)
        else:
            text = translate_text(text)
        pipe = DiffusionPipeline.from_pretrained(
        "stabilityai/stable-diffusion-xl-base-1.0",
        torch_dtype=torch.float16,
        variant="fp16",
        ).to("cuda")
        
       
        ml_model = getMlModel(json)
        print(ml_model)
        scale = getScale(json)
        
        
        size = width
        if height != width:
            size = min(width, height)    
        
        if banner_type == "NBO":
            size = size / 2
        size = (size // 8) * 8

        print(f"size: {size}")
        
        pipe.load_lora_weights(ml_model, weight_name="pytorch_lora_weights.safetensors")

        prompt = f"In the style of {ml_model}, {text}, in the style of {ml_model}" 
        print(prompt)
        negative_prompt='poorly drawn, low resolution, oversaturated, blurry image ,'

        count_img = 3
        image = pipe(prompt=prompt, negative_prompt=negative_prompt, num_images_per_prompt=count_img, num_inference_steps=100, cross_attention_kwargs={"scale": scale}, width=size, height=size)[0]
        print(image)
        for seed in range(count_img):
                output = remove_background(json, image[seed])
                output = adoptBackGround(json, output)
                output.save(f"image_{seed}_{id}.png")


'''grey, light blue, blue, orange, violet, blue, pink '''
backGroundColors = ["#8d8d9c", "#61b5fe", "#345dd4", "#ff613b", "#7463e2", "#5b74f7", "#ff4c63"]
def getBackGroundColor(json):
    
    if banner_type == "NBO" or banner_type == "ghost":
        return random.choice(backGroundColors)
    return (255, 0, 0, 0)

def adoptBackGround(json, image):
    image = image.convert("RGBA")
    color = getBackGroundColor(json)
    new_image = Image.new("RGBA", (width, height), color)
   
    if banner_type == "NBO" :
         new_image.paste(image, (width - image.width, int(height / 2 - image.height /2)), image)
    if banner_type == "ghost" :
        new_image.paste(image, (width - image.width, int(height / 2 - image.height /2)), image)
        
    if banner_type or banner_type == "background" or banner_type == "logo":
       new_image.paste(image, (int( width / 2 - image.width /2),  int(height / 2 - image.height /2)), image)
    
    return new_image

def getScale(json):
     if banner_type == "background" or banner_type == "logo":
          return 0.9
     if banner_type == "megabanner" or banner_type == "ghost" or banner_type == "NBO":
        if product == "CC" or product == "DC" or product == "PREMIUM" or product == "INS_LIFE":
          return 1.0
        else:
          return 0.8
          
def getMlModel(json):
     if banner_type == "background" or banner_type == "logo": 
          return "BANK_BACKGROUND"
     if banner_type == "megabanner" or  banner_type == "ghost" or  banner_type == "NBO":
          return "ICON"

def remove_background(json, image):
     output = image
     if banner_type == "megabanner" or  banner_type == "ghost" or banner_type == "NBO":
        output = remove(image)
     return output

def get_text(json):
    text = ""
    if banner_type == "megabanner":
         text += "an icon of "
    if product == "PC":
        text += get_PC_text(json)
    if product == "CC":
        text += get_CC_text(json)
    if product == "AUTO":
        text += get_car_text(json)
    if product == "MORTG":
        text += get_MORTGPrompt_text(json)
    if product == "DC":
        text += get_CC_text(json)
    if product == "PREMIUM":
        text += get_CC_text(json)
    if product == "INS_LIFE":
        text += get_INS_LivePrompt_text(json)  
    return text

PCPrompt = ['a cool laptop and a smartphone', 'two palm trees on the seashore', 'beautiful furniture', 'plane over the sea', 'airplane in the clouds' ]

CARPromptMen = ['a new blue car with an orange bow on it', 'a new big black car with an orange bow on it']
CARPromptWoman = ['a tiny pink car with an orange bow on it', 'a new white car with a pink bow on it']
MORTGPrompt = ['a new house', 'a new home', 'a new flat', 'a new apartment']

def get_PC_text(json):
    if banner_type == "megabanner" or  banner_type == "ghost" or  banner_type == "NBO":
        if json["user_info"]["gender"] == "1":
            return "an orange bag of lady"
        else:
            return "an orange laptop"
    return random.choice(PCPrompt)

def get_CC_text(json):
     return "a credit card " + random.choice(PCPrompt)

def get_MORTGPrompt_text(json):
     return random.choice(MORTGPrompt)
     
def get_INS_LivePrompt_text(json):
     return "an orange heart and a medical symbol"     

def get_car_text(json):
    if json["user_info"]["gender"] == "1":
        return random.choice(CARPromptWoman)
    return random.choice(CARPromptMen) 
'''image.save("llama.png")'''