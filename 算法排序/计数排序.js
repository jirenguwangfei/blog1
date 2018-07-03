a <- {
    '0':0,
    '1':2,
    '2':1,
    '3':56,
    '4':3,
    '5':67,
    '6':4,
    'length':7
}
hash <- {
    //  0 2 1 56 3 67 3 引入后面的计数排序2
}
index <- 0
while (index < a['length'])
    number = a[index]  //0,2,1,56,3,67,4
    if hash[number] == undefined  //hash[number] 不存在
        hash[number] = 1
    else   //hash[number]存在
        hash[number] = hash[number] + 1
    end
    index <- index + 1
end
index2 <- 0
max <- findMax(a)
newArr <- {}
while (index2 < max + 1) //index2 == max(67) 是可以出现的，index2<68
    count = hash[index2]
    if count != undefined
        countIndex = 0
        while (countIndex < count)
            newArr.push(index2)
            countIndex <- countIndex + 1
        end
    end
        index2 <- index2 + 1
end
print newArr
end