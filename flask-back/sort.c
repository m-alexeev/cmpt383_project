#include <stdio.h>
#include <stdlib.h>
#include <string.h>


static int strCmp(const void *lhs, const void *rhs){
    const char **left = (const char **)lhs;
    const char **right = (const char **)rhs; 

    
    return strcmp(*left,*right); 
}

char** sort_arr(const char** list, int length){
    // Sort the list of strings
    char** newArr = malloc(sizeof(list) * length); 
    memcpy(newArr, list, sizeof(list) * length);
    
    
    for (int i = 0; i < length; i ++){
        printf("%s\n", newArr[i]);
    }
    printf("\n");
    qsort(newArr, length, sizeof(newArr[0]), strCmp); 

    return newArr;
}

