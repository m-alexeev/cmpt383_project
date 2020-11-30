from ctypes import *
import os 

lib = ctypes.CDLL("./sort.so")

def covertToBytesString(arr):
    byteArr = []
    #Convert to utf-8 array supported by C++
    for str in arr: 
        byteArr.append(bytes(str,'utf-8'))
    return byteArr


def sortArrayC(arr):
    pass

def jsonToArray(json):
    pass
