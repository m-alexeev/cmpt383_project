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

    res = lib.sort_arr
    res.restype = ctypes.POINTER(ctypes.c_char_p)
    result = res(cArr, len(cArr))
    for i in range(len(cArr)):
        print(result[i].decode())


def jsonToArray(json):
    pass


sortArrayC(covertToBytesString(["abc", "xxx","def"]))