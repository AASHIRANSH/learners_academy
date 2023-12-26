# custom model creation in json
import json

class Exercise():
    class objects():
        def all(*args, **kwargs):
            with open("models.json", mode="r") as mjson:
                mjson = json.loads(mjson.read())
            
            return mjson
        
        def get(*args, **kwargs):
            return kwargs
        
        def create(*args, **kwargs):
            # with open("models.json", mode="a") as writem

            return None
        
print(Exercise.objects.get(name="Asif"))
print(Exercise.objects.all())