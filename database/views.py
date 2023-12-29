from django.shortcuts import render

# custom model creation in json
from pathlib import Path
import os
import json

from requests import delete

BASE_DIR = Path(__file__).resolve().parent.parent
models_path = BASE_DIR/'database//models//'
dir_list = os.listdir(models_path)

# models_path = "C://Users//newze//OneDrive//Programming//projects//learners_academy//database//models"


class Models:

    def __init__(self, *args, **kwargs):
        with open(f"{models_path/kwargs['name']}.json") as model:
            mm = json.load(model)
        self.model = mm

    def create(*args, **kwargs):
        def_model = {
            "pk_count":0,
            "model_name":kwargs["model_name"],
            "objects":[]
        }
        if kwargs["model_name"]+".json" in dir_list:
            raise Exception(f'''The model "{kwargs["model_name"]}" already exists.''')
        else:
            with open(f"{models_path/kwargs['model_name']}.json", mode="w") as write_model:
                # new_model.write(json.dumps(def_model, indent=4))
                json.dump(def_model,fp=write_model, indent=4)
                print(f'''The model "{kwargs["model_name"]}" was created successfully''')

    def all():
        if len(dir_list) == 0:
            raise Exception("No model(s) found!")
        else:
            dir_list_replaced = [x.replace(".json","") for x in dir_list]
            return dir_list_replaced
    
    def save(*args, **kwargs):
        with open(f"{models_path/kwargs['model']['model_name']}.json", mode="w") as save_model:
            json.dump(kwargs["model"], fp=save_model, indent=4)

    def delete(*args, **kwargs):
        if kwargs:
            model = f"{models_path/kwargs['name']}.json"
            if os.path.exists(model):
                os.remove(model)
                print(f'''The model "{kwargs['name']}" has been deleted''')
            else:
                raise Exception(f'''The model "{kwargs['name']}" does not exist''')
        else:
            print("model name not given")

    class objects:

        def create(*args, **kwargs):
            if kwargs["model_name"]+".json" in dir_list:
                with open(f"{models_path/kwargs['model_name']}.json") as model:
                    model = json.load(model)
            
            obj_dict = {
                "pk":model["pk_count"]+1
            }
            for field in Models.fields:
                if field in kwargs.keys():
                    obj_dict.update({
                        field:kwargs[field]
                    })
            
            model["pk_count"]+= 1
            model["objects"].append(obj_dict)
                
            with open(f"{models_path/kwargs['model_name']}.json", mode="w") as write_model:
                # new_model.write(json.dumps(def_model, indent=4))
                json.dump(model,fp=write_model, indent=4)
                print(f'''The model "{kwargs["model_name"]}" was updated successfully''')
        
        def get(*args, **kwargs):
            allowed_fields = Models.fields
            if kwargs["name"]+".json" in dir_list:
                with open(f"{models_path/kwargs['name']}.json") as model:
                    model = json.load(model)
                return model
            else:
                raise Exception("No model(s) found!")

''' Tables '''
class Turkey(Models):
    Models.fields = ["word","pos","definition","example"]


# Turkey.create(model_name="againmodel",
#     word="myfirstword",
#     pos="noun",
#     definition="this is a word"
# )
    
# Turkey.objects.create(model_name="againmodel",
#     word="myfirstword",
#     pos="noun",
#     definition="this is a word"
# )
    
Turkey.delete(name="againmodel")

# print(x)
# print(dir(x))