# custom model creation in json
import json

class Exercise():
    class objects():
        def all():
            with open("languages/english/data/models.json") as mjson:
                mjson = json.loads(mjson.read())
            return mjson
        
        def get(*args, **kwargs):
            return kwargs
        
        def create(*args, **kwargs):
            return None
        
print(Exercise.objects.get(name="Asif"))