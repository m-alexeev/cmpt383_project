#include <stdio.h>
#include <stdlib.h>
#include <string.h>


static int strCmp(const void *lhs, const void *rhs){
    const char **left = (const char **)lhs;
    const char **right = (const char **)rhs; 

    
    return strcmp(*left,*right); 
}

static int strCmpRev(const void *lhs, const void *rhs){
    const char **left = (const char **)lhs; 
    const char **right = (const char **)rhs; 

    return (-1) * strcmp(*left, *right); 
}

char** sort_arr(const char** list, int length, int asc){
    // Sort the list of strings
    char** newArr = malloc(sizeof(list) * length); 
    memcpy(newArr, list, sizeof(list) * length);
    
    if (asc == 0){
        qsort(newArr, length, sizeof(newArr[0]), strCmp); 
    }
    else{
        qsort(newArr,length,sizeof(newArr[0]),strCmpRev);
    }
    return newArr;
}

