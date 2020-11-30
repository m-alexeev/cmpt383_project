import ctypes 
import os 

lib = ctypes.CDLL("./sorts.so")

def covertToBytesString(arr):
    byteArr = []
    #Convert to utf-8 array supported by C++
    for str in arr: 
        byteArr.append(bytes(str,'utf-8'))
    return byteArr


def sortArrayC(arr):
    cArr = (ctypes.c_char_p * len(arr))()
    cArr [:] = arr
    lib.sort_arr.restype = ctypes.c_char_p
    res = lib.sort_arr(cArr, len(cArr))
    print(res)

def jsonToArray(json):
    pass


sortArrayC(covertToBytesString(["abc", "xxx","def"]))