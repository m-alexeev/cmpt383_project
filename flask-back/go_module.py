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
    print(arr)
    cArr = (ctypes.c_char_p * len(arr))()
    cArr [:] = arr

    res = lib.sort_arr
    res.restype = ctypes.POINTER(ctypes.c_char_p)
    result = res(cArr, len(cArr))
    
    return [result[i].decode() for i in range (len(cArr))]



def jsonToArray(json):
    pass

