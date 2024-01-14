# from django.db import models

# custom model creation in json
from pathlib import Path
import os
import json

BASE_DIR = Path(__file__).resolve().parent.parent
models_path = BASE_DIR/'database//models//'
dir_list = os.listdir(models_path)

# models_path = "C://Users//newze//OneDrive//Programming//projects//learners_academy//database//models"


class Models:

    def __init__(self, *args, **kwargs):
        with open(f"{models_path/self.mode_name}.json") as model:
            mm = json.load(model)
        self.model = mm

    def create(*args, **kwargs):

        model_name = Models.model_name

        def_model = {
            "pk_count":0,
            "model_name":model_name,
            "objects":[]
        }

        if model_name+".json" in dir_list:
            raise Exception(f'''The model "{model_name}" already exists.''')
        else:
            with open(f"{models_path/model_name}.json", mode="w") as write_model:
                # new_model.write(json.dumps(def_model, indent=4))
                json.dump(def_model,fp=write_model, indent=4)
                print(f'''The model "{model_name}" was created successfully''')

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

            model_name = Models.model_name

            if model_name+".json" in dir_list:
                with open(f"{models_path/model_name}.json") as model:
                    model = json.load(model)
            
            obj_dict = {
                "pk":model["pk_count"]+1
            }

            for field in Models.fields:
                if field in kwargs.keys():
                    obj_dict.update({
                        field:kwargs[field]
                    })
                else:
                    print(f"'{field}' field is not present in the table")
            
            model["pk_count"]+= 1
            model["objects"].append(obj_dict)
                
            with open(f"{models_path/model_name}.json", mode="w") as write_model:
                # new_model.write(json.dumps(def_model, indent=4))
                json.dump(model,fp=write_model, indent=4)
                print(f'''The model "{model_name}" was updated successfully''')
        
        def get(*args, **kwargs):
            model_name = Models.model_name
            # allowed_fields = Models.fields

            if model_name+".json" in dir_list:
                with open(f"{models_path/model_name}.json") as model:
                    model_objects = json.load(model)["objects"]

                if len(model_objects) == 0:
                    raise Exception("The model is empty")
                for x in model_objects:
                    if x["pk"] == kwargs["pk"]:
                        model = x
                        return model
            else:
                raise Exception("No object found with id {}!".format(model_name))

        # def all(*args, **kwargs):
        #     if kwargs["model_name"]+".json" in dir_list:
        #         with open(f"{models_path/kwargs['model_name']}.json") as model:
                    
        #         return model
        #     else:
        #         raise Exception("No model(s) found!")



''' Tables '''
class Turkey(Models):
    Models.model_name = "turkey_model"
    Models.fields = ["word","pos","definition","examples"]


class ArabicDictionary(Models):
    pass
    # Models.model_name = "arabic_model"
    # Models.fields = ["past_form","present_form","pos","definition","examples","en_word","en_definition"]
    

''' NOTE: read the documentation below for the use '''

''' Create Model '''
# Turkey.create()
# ArabicDictionary.create()
    

''' Create Model Objects '''
# Turkey.objects.create(
#     word="myfirstword",
#     pos="noun",
#     definition="this is a word",
#     waht="dhaht"
# )


''' Get Model Objects '''
# x = Turkey.objects.get(pk=1)
# print(x)


''' Delete Model '''
# Turkey.delete(name="turkey_model")


# print(dir(x))