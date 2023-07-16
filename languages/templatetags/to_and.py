from django import template

register = template.Library()

@register.filter
def to_and(value):
    return value.replace("<>","↔")

@register.filter
def repla(value):
    return value.replace(value,"<a href='http://word.word'>go</a>")