# def_model = {
#     "model_name":"name",
#     "objects":[]
# }

# def_model["objects"].append({"what":"nothing"})
# print(def_model)
code = '''
print(1+1)
'''
# exec(code)

class Turkey:
    ee = "nothing"

    # @classmethod
    # def name(cls):
    #     print(cls.__name__.lower(), cls.__dict__.items())

model_fields = {k:v for k,v in Turkey.__dict__.items() if not k.startswith("__")}
print(model_fields)